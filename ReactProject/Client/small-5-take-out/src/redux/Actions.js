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