// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var talkDetails=args.talkDetails;

alert("destalles "+JSON.stringify(talkDetails));

$.talktitle.text    = talkDetails.title;
$.time.text       = talkDetails.time;
$.room.text       = talkDetails.room;
$.description.text    = talkDetails.description;
//$.speakerbio.text = talkDetails.ponente.bio;

// if (talkDetails.speaker !== '' && talkDetails.speaker !== null){
  // $.speaker.text = String.format(L('about'),talkDetails.speaker);
// }else{
  // $.speaker.text = '';
// }
// 
// if (talkDetails.speakerbio !== '' && talkDetails.speakerbio !== null){
  // $.speakerbio.text = talkDetails.speakerbio;
// }else{
  // $.speakerbio.text = '';
// }

function closewindow(evt){
  $.talkdetails.close();
}