import SphereEngineSubmissionStatus from './SphereEngineSubmissionStatus.js'

const BASE_URL = `http://${process.env.SPHERE_COMPILERS_ENDPOINT}/api/v3`
const PARAM_ACCESS_TOKEN = `access_token=${process.env.SPHERE_COMPILERS_ACCESS_TOKEN}`

function createSubmission(submissionData) {
    const URL = `${BASE_URL}/submissions?${PARAM_ACCESS_TOKEN}`

    return fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissionData)
            })
            .then((response) => {
                if (response.status === 201) {
                    return response.json()
                }
                if(response.status === 401) {
                    throw new Error('Invalid access token')
                }
                
                throw new Error('Connection problem');
            })
}

function submit(submissionCode) {
    return createSubmission(submissionCode)
            .then((submission) => submission.id)
            .then(async (submissionId) => {
                const submissionFinishedInfo = await awaitSubmissionFinish(submissionId)
                const submissionStatus = SphereEngineSubmissionStatus.get(submissionFinishedInfo.result)

                if(submissionStatus) {
                    return {
                        submissionId,
                        submissionStatus: submissionStatus
                    }
                } else {
                    throw new Error('Internal Server Error')
                }
            })
            .then(async (submissionFinished) => {
                const { submissionId } = submissionFinished
                const submissionResult = await submissionOutput(submissionId)
                
                return {
                    ...submissionFinished,
                    submissionResult
                }
            })
}

function submissionInfo(submissionID) {
    const URL = `${BASE_URL}/submissions/${submissionID}?${PARAM_ACCESS_TOKEN}` 
    return fetch(URL).then(response => response.json())
}

async function awaitSubmissionFinish(submissionID) {
    const response = await submissionInfo(submissionID)
    if(submissionHasFinished(response.status)) return response
    
    return new Promise(resolve => {
        setTimeout(() => resolve(awaitSubmissionFinish(submissionID)), 5000)
    })
}

function submissionHasFinished(status) {
        if(status === 0) return true
        return false
}


function submissionOutput(submissionID) {
    const URL = `${BASE_URL}/submissions/${submissionID}/output?${PARAM_ACCESS_TOKEN}` 

    return fetch(URL)
            .then(response => {
                if(response.status === 200) {
                    return response.text()
                } 
                if(response.status === 401) {
                    throw new Error('Unauthorized Access')
                }
                throw new Error(`Server error: ${response.status}`)
            })
}

function SphereEngineService(serviceType){
    return {
        submit: code => submit({
            language: serviceType,
            sourceCode: code
        })
    }
}

export default SphereEngineService