window.BAO_FLOWS={
  special:[{type:'text',title:'Which special case is closest?',sub:'These stay conservative until we have stronger evidence.',options:[
    {label:'Cracked / opened bun',value:'crack',desc:'Surface or seal split open.'},
    {label:'Frozen / reheated',value:'reheat',desc:'Texture changed after storage or reheating.'},
    {label:'Other / not listed',value:'other',desc:'Keep this as Beta rather than guessing.'}
  ]}],
  norise:[
    {type:'visual',title:'Which pre-steam proof state was closer?',sub:'Use photo and feel together.',proof:true,options:[
      {label:'Still tight / small',value:'under',desc:'Small/heavy; a finger press springs back quickly',img:'underproof'},
      {label:'Plump but stable',value:'ready',desc:'About 50% puffier; lighter; press returns slowly',img:'normal'},
      {label:'Very puffy / fragile',value:'over',desc:'Spreading or fragile; press does not recover',img:'overproof'}]},
    {type:'text',title:'Was the dough or kitchen unusually cool?',sub:'Cold dough can make a normal recipe move much slower.',options:[
      {label:'Yes',value:'cool',desc:'Cool room, cold dough or recently refrigerated.'},{label:'No / not sure',value:'normal',desc:'No obvious temperature clue.'}]},
    {type:'text',title:'Any direct yeast or formula clue?',sub:'Only elevate these causes when there is a real clue.',options:[
      {label:'Old/expired yeast or yeast method changed',value:'yeast',desc:'Direct yeast clue.'},{label:'Dough was much stiffer/drier or flour changed',value:'stiff',desc:'Direct formula clue.'},{label:'No obvious clue',value:'none',desc:'Proofing remains the main family.'}]}
  ],
  collapse:[
    {type:'text',title:'When did the bun mainly lose volume?',sub:'Timing helps separate proof-state failure from a post-steam transition clue.',options:[
      {label:'Before steaming / while waiting',value:'waiting',desc:'It was already weakening.'},{label:'Mostly after steaming / lid opening',value:'after',desc:'It looked okay until late.'},{label:'Not sure',value:'unsure',desc:'Timing was not clear.'}]},
    {type:'visual',title:'Which pre-steam state was closer?',sub:'Proof-state evidence is stronger than the final collapse alone.',proof:true,options:[
      {label:'Very puffy / fragile / spreading',value:'over',desc:'Strong over-proof cue',img:'overproof'},{label:'Plump but stable',value:'ready',desc:'Closer to ready',img:'normal'},{label:'Tight / not very puffy',value:'under',desc:'Not an over-proof cue',img:'underproof'}]},
    {type:'text',title:'Was there an obvious moisture clue?',sub:'Wet spots or lid drips can move the case away from generic “thermal shock” advice.',options:[
      {label:'Yes — wet spots, pits or lid droplets',value:'wet',desc:'Direct water clue.'},{label:'No',value:'dry',desc:'No clear moisture clue.'},{label:'Not sure',value:'unsure',desc:'You did not check.'}]}
  ],
  wrinkle:[
    {type:'text',title:'Did the wrinkled bun also lose volume?',sub:'Wrinkle and collapse overlap, but they are not the same observation.',options:[
      {label:'Yes',value:'yes',desc:'It also became flatter or smaller.'},{label:'No',value:'no',desc:'It stayed roughly full-sized.'},{label:'Not sure',value:'unsure',desc:'You only noticed the surface.'}]},
    {type:'visual',title:'Which surface looked closer?',sub:'Visible moisture is a stronger clue than a generic wrinkle.',options:[
      {label:'Wet / pitted / water-marked',value:'wet',desc:'Moisture clue is visible',img:'wet'},{label:'Dry wrinkle / puckered skin',value:'dry',desc:'No direct water clue',img:'wrinkled'},{label:'Closer to smooth',value:'smooth',desc:'The symptom match may be weak',img:'normal'}]}
  ],
  dense:[
    {type:'visual',title:'Which pre-steam proof state was closer?',sub:'If it never rose properly, diagnose that before blaming flour.',proof:true,options:[
      {label:'Still tight / small',value:'under',desc:'Weak rise before steaming',img:'underproof'},{label:'Plump / normal-looking',value:'ready',desc:'Rise was broadly okay',img:'normal'},{label:'Very puffy / spreading',value:'over',desc:'Could be over-proofed',img:'overproof'}]},
    {type:'visual',title:'Which cut-open crumb is closest?',sub:'Use the inside, not the outside, to separate dense from gummy.',options:[
      {label:'Fluffy / aerated',value:'fluffy',desc:'Visible air cells; soft, dry-looking crumb',img:'fluffyCrumb'},{label:'Dense / tight',value:'densecrumb',desc:'Small tight cells; compact and heavy',img:'denseCrumb'},{label:'Wet / gummy',value:'gummy',desc:'Glossy, wet, compressed or slightly translucent',img:'gummyCrumb'}]},
    {type:'text',title:'Did the dough feel unusually dry or stiff, or did you change flour?',sub:'This is a useful discriminator for flour / hydration mismatch.',options:[
      {label:'Yes',value:'yes',desc:'There was a direct stiffness or formula clue.'},{label:'No',value:'no',desc:'No strong flour/hydration clue.'}]}
  ],
  wet:[{type:'text',title:'Were lid droplets visible, or could water drip directly onto the buns?',sub:'Direct water evidence makes condensation much stronger.',options:[
    {label:'Yes',value:'drip',desc:'Direct droplet/setup clue.'},{label:'No / not sure',value:'none',desc:'Moisture source is not isolated.'}
  ]}]
};
