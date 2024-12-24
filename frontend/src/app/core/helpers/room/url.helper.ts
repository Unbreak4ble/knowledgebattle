
export function toRoomPin(pin:number): string {
    const url = window.location.protocol+'//'+window.location.host+'/room'+'?pin='+pin;

    return url;
}