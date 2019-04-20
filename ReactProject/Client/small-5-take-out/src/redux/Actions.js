export function SavePlace(txt) {
  return {
        type:'SAVE',
        place:txt
       }
    }
export function Saveuser(txt){
  return {
    type:'SAVEUSER',
    user:txt
   }
}
export function Saveuserid(txt){
  return {
    type:'SAVEUSERID',
    userid:txt
   }
}
export function Saveshopid(txt){
  return {
    type:'SAVESHOPID',
    shopid:txt
   }
}