//@ts-check

const AVB_MAGIC = "AVB0";
const AVB_MAGIC_LEN = 4;
const FLAGS_OFFSET = 123;
const FLAG_DISABLE_VERITY = 0x01;
const FLAG_DISABLE_VERIFICATION = 0x02;

function convertString(array) {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(array);
}

// arraybuffer disable_verity:bool disable_verification:bool
function ParseVbmetaData(vbmetaData, disable_verity, disable_verification) {
    const view = new Uint8Array(vbmetaData);

    const magic = convertString(view.subarray(0, AVB_MAGIC_LEN));
    if (magic != AVB_MAGIC) {
        throw new Error("Invalid format, this is not a vbmeta image");
    }

    console.log("Origin flag:", view[FLAGS_OFFSET]);
    console.log("DISABLE_VERITY:", Boolean(view[FLAGS_OFFSET] & FLAG_DISABLE_VERITY));
    console.log("DISABLE_VERIFICATION:", Boolean(view[FLAGS_OFFSET] & FLAG_DISABLE_VERIFICATION));

    let flag = 0;
    if (disable_verity) {
        flag |= FLAG_DISABLE_VERITY
    }

    if (disable_verification) {
        flag |= FLAG_DISABLE_VERIFICATION
    }

    view[FLAGS_OFFSET] = flag;

    console.log("Edited flag:", view[FLAGS_OFFSET]);
    console.log("DISABLE_VERITY:", Boolean(view[FLAGS_OFFSET] & FLAG_DISABLE_VERITY));
    console.log("DISABLE_VERIFICATION:", Boolean(view[FLAGS_OFFSET] & FLAG_DISABLE_VERIFICATION));
};