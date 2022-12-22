export const fileValidation = (fileSize:number) => {
    const maxSize =  1 * 1024 * 1024;
    if (fileSize > maxSize) return false;
    return true;
};

export const addFile = (file:any, setIsValid: (value: boolean) => void) => {
    if (file !== null) {
        if (fileValidation(file[0].size) === true){
            setIsValid(false);
        } else {
            setIsValid(true);
        };
    };
};

//
// export const fileValidation = (fileSize:number) => {
//     const maxSize =  1 * 1024 * 1024;
//     if (fileSize > maxSize) return false;
//     return true;
// };
//
// export const addFile = (file:any, setIsValid: (value: boolean) => void, reader:any) => {
//     if (file !== null) {
//         if (fileValidation(file[0].size) === true){
//             reader.readAsDataURL(file[0]);
//             setIsValid(false);
//         } else {
//             setIsValid(true);
//         };
//     };
// };