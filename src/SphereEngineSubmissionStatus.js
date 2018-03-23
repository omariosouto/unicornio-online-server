const SphereEngineSubmissionStatus = new Map()

SphereEngineSubmissionStatus.set(11, {
    value: 11,
    name: "compilation error",
    description: "the program could not be executed due to compilation error,"
})

SphereEngineSubmissionStatus.set(12, {
    value: 12,
    name: "runtime error",
    description: "the program finished because of the runtime error, for example: division by zero, array index out of bounds, uncaught exception,"
})
SphereEngineSubmissionStatus.set(13, {
    value: 13,
    name: "time limit exceeded",
    description: "the program didn't stop before the time limit,"
})
SphereEngineSubmissionStatus.set(15, {
    value: 15,
    name: "success",
    description: "everything went ok,"
})
SphereEngineSubmissionStatus.set(17, {
    value: 17,
    name: "memory limit exceeded",
    description: "the program tried to use more memory than it is allowed to,"
})
SphereEngineSubmissionStatus.set(19, {
    value: 19,
    name: "illegal system call",
    description: "the program tried to call illegal system function,"
})
SphereEngineSubmissionStatus.set(20, {
    value: 20,
    name: "internal error",
    description: "some problem occurred on Sphere Engine; try to submit the program again and if that fails too, then please contact us"
})

export default SphereEngineSubmissionStatus