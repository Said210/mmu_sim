enum digit_value {
    //% block="zero"
    zero,
    //% block="one"
    one,
    //% block="complement"
    com
}

function convertBase(str: string, fromBase:number, toBase:number) {

    const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";

    const add = (x: number[], y: number[], base: number) => {
        let z  = [];
        if (x == null) { x = [] }  
        if (y == null) { y = [] }
        const n = Math.max(x.length, y.length);
        let carry = 0;
        let i = 0;
        while (i < n || carry) {
            const xi = i < x.length ? x[i] : 0;
            const yi = i < y.length ? y[i] : 0;
            const zi = carry + xi + yi;
            z.push(zi % base);
            carry = Math.floor(zi / base);
            i++;
        }
        return z;
    }

    const multiplyByNumber = (num: any, x: number[], base: any) => {
        if (num < 0) return null;
        if (num == 0) return [];

        let result;
        let power = x;
        while (true) {
            num & 1 && (result = add(result, power, base));
            num = num >> 1;
            if (num === 0) break;
            power = add(power, power, base);
        }

        return result;
    }

    const parseToDigitsArray = (str: string, base: number) => {
        const digits = str.split('');
        let arr = [];
        for (let i = digits.length - 1; i >= 0; i--) {
            const n = DIGITS.indexOf(digits[i])
            if (n == -1) return null;
            arr.push(n);
        }
        return arr;
    }

    const digits = parseToDigitsArray(str, fromBase);
    if (digits === null) return null;

    let outArray;
    let power = [1];
    for (let i = 0; i < digits.length; i++) {
        digits[i] && (outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase));
        power = multiplyByNumber(fromBase, power, toBase);
    }

    let out = '';
    for (let i = outArray.length - 1; i >= 0; i--)
        out += DIGITS[outArray[i]];

    return out;
}

namespace Bits {
    //% blockId="id_pow" block="%op1 | raised to %op2"
    export function fn_raiseto(base: number, exp: number): number {
        return Math.pow(base, exp)
    }
    //% blockId="id_getbit" block="get bit %op1 | in %op2"
    export function fn_getbit(pos: number, num: number): number {
        return (num >> pos) & 1
    }
    //% blockId="id_setbit" block="set bit %op1 | in %op2 | to %d"
    export function fn_setbit(pos: number, num: number, dv: digit_value): number {
        if (dv == digit_value.zero)
            return num & ((1 << pos) ^ 0xffff)
        else if (dv == digit_value.one)
            return num | (1 << pos)
        else
            return num ^ (1 << pos)
    }

    let hex_arr = "0123456789abcdef"
    let dec_num = 0

    //% blockId="id_hextodec" block="convert hexadecimal %hex_num | to decimal"
    export function fn_HextoDec(hex_num: string): number {
        dec_num = 0
        for (let index = 0; index <= hex_num.length - 1; index++) {
            let char = hex_num.charAt(hex_num.length - 1 - index)
            for (let index2 = 0; index2 <= 15; index2++) {
                if (char.compare(hex_arr.charAt(index2)) == 0) {
                    dec_num = dec_num + index2 * Math.pow(16, index)
                }
            }
        }
        return dec_num
    }
    //% blockId="id_convertBase" block="convertir %str de base %fromBase a base %toBase"
    export function fn_convertBase(str: string, fromBase: number, toBase: number) {

        const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";

        const add = (x: number[], y: number[], base: number) => {
            let z = [];
            if (x == null) { x = [] }
            if (y == null) { y = [] }
            const n = Math.max(x.length, y.length);
            let carry = 0;
            let i = 0;
            while (i < n || carry) {
                const xi = i < x.length ? x[i] : 0;
                const yi = i < y.length ? y[i] : 0;
                const zi = carry + xi + yi;
                z.push(zi % base);
                carry = Math.floor(zi / base);
                i++;
            }
            return z;
        }

        const multiplyByNumber = (num: any, x: number[], base: any) => {
            if (num < 0) return null;
            if (num == 0) return [];

            let result;
            let power = x;
            while (true) {
                num & 1 && (result = add(result, power, base));
                num = num >> 1;
                if (num === 0) break;
                power = add(power, power, base);
            }

            return result;
        }

        const parseToDigitsArray = (str: string, base: number) => {
            const digits = str.split('');
            let arr = [];
            for (let i = digits.length - 1; i >= 0; i--) {
                const n = DIGITS.indexOf(digits[i])
                if (n == -1) return null;
                arr.push(n);
            }
            return arr;
        }

        const digits = parseToDigitsArray(str, fromBase);
        if (digits === null) return null;

        let outArray;
        let power = [1];
        for (let i = 0; i < digits.length; i++) {
            digits[i] && (outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase));
            power = multiplyByNumber(fromBase, power, toBase);
        }

        let out = '';
        for (let i = outArray.length - 1; i >= 0; i--)
            out += DIGITS[outArray[i]];

        return out;
    }
}
