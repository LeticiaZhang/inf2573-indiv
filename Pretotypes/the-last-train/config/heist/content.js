const questions = ['Who gets things moving?', 'Who notices what others miss?', 'Who keeps the group together?'];
const roles = [
  {name:'Runner', track:'Supply', question:0, wish:'Successfully contribute Supply in at least one chapter.', secret:'Someone put your parcel on this train. You want to take it with you.'},
  {name:'Mechanic', track:'Supply', question:1, wish:'Choose Service in chapter 3.', secret:'You recognise this old train and know what it needs to run.'},
  {name:'Mediator', track:'Care', question:2, wish:'Help the crew reach the Care threshold in any chapter.', secret:'You promised the passengers that this rescue would not become a blame game.'},
  {name:'Scout', track:'Cover', question:1, wish:'Choose Tunnel in chapter 2.', secret:'You once worked as a guide in the old tunnel.'},
  {name:'Quartermaster', track:'Supply', question:0, wish:'Finish with at least 3 Fuel.', secret:'You like a reserve. “Just enough” never feels like enough.'},
  {name:'Chronicler', track:'Care', question:2, wish:'Finish with at least 3 Hope.', secret:'You want to record how everyone helped, not just the escape route.'},
];
const chapters = [
  {title:'A Dark Platform', subtitle:'Wake the station.', scene:'The platform is dark. A vending machine offers an emergency battery. A hand crank could wake the station too, but the crew is exhausted.', npc:'Vending machine · “Emergency power. Please choose carefully.”', options:[{id:'Battery',text:'Take the emergency battery',hint:'Power for the train. A less quiet departure.'},{id:'Crank',text:'Turn the hand crank together',hint:'Light for the station. A tired crew.'}], default:'Battery', clues:[
    'The emergency battery contains two fuel units. Removing it will sound an alarm once.',
    'The crank is quiet, but everyone will be tired. It will not add fuel to the train.',
    'A lit station can calm the crew next chapter: choosing Signal will restore two Hope rather than one.',
    'One quiet route opens behind the platform.',
    'Check the fuel reserve at the top of your screen. Spare fuel matters at departure.',
    'A lit station will be easier for waiting passengers to find.'
  ]},
  {title:'The Fork', subtitle:'Find a way through.', scene:'The track divides. The old tunnel is quiet but its ventilation is unreliable. The signal route is visible to the wardens but may reassure everyone.', npc:'Announcer · “Two tracks. One last departure.”', options:[{id:'Tunnel',text:'Take the old tunnel',hint:'A quieter route that uses fuel.'},{id:'Signal',text:'Follow the signal route',hint:'Reassurance for the crew, in sight of the wardens.'}], default:'Tunnel', clues:[
    'The tunnel consumes one fuel unit and lowers Alert by one.',
    'If you removed the battery, tunnel ventilation will fail and cost one Hope.',
    'The signal route adds one Alert and one Hope; if you lit the station, it adds one extra Hope.',
    'The tunnel consumes one fuel unit and lowers Alert by one.',
    'Check your fuel. The tunnel uses one unit.',
    'Remember whether you lit the station. Its lights can answer your signal.'
  ]},
  {title:'Departure', subtitle:'Everyone on board.', scene:'The wardens are entering the station. You can launch immediately, or stop for one final service check. Choose what kind of departure you are willing to risk.', npc:'Attendant · “No one gets left behind.”', options:[{id:'Launch',text:'Launch immediately',hint:'A rush of hope, with the wardens close behind.'},{id:'Service',text:'Make one final service check',hint:'A careful, quieter start.'}], default:'Service', clues:[
    'Launching now gives the crew one Hope but raises Alert by one.',
    'Launch needs at least 3 Fuel; Service needs only 2. This chapter’s personal actions count before departure is evaluated.',
    'A clean escape needs Hope at least 2 and Alert at most 4. Fuel alone cannot fix a panicked crew.',
    'For a clean escape, Alert must be at most 4.',
    'Launch needs 3 Fuel. Service needs 2 Fuel. Personal actions count first.',
    'For a clean escape, Hope must be at least 2.'
  ]}
];
const outcomes = {
  Battery:'The battery clicks free. The train hums awake; an alarm rings across the platform.',
  Crank:'Together, you turn the crank. Warm light fills the station, but your arms ache.',
  Tunnel:'The carriage slips into the old tunnel, out of sight of the wardens.',
  Signal:'The signal lights mark a way forward. Your crew lifts their heads.',
  Launch:'The crew braces for departure. The wardens hear the engine surge.',
  Service:'One final check settles the engine. You are ready for a quieter departure.'
};
module.exports = {questions, roles, chapters, outcomes};
