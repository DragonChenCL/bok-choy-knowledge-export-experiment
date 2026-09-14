(()=>{
  const clean=value=>String(value||'').trim();
  const stripRank=value=>clean(value).replace(/^#\d+\s*/,'');

  function classify(snapshot,test,rootCause){
    const s=`${clean(snapshot?.symptom)} ${clean(test)} ${clean(rootCause)} ${clean(snapshot?.title)}`.toLowerCase();
    if(/anti-drip|condensation|droplet|lid drip|direct water/.test(s))return 'condensation';
    if(/covered rest|opened immediately|post-steam|lid-opening|3-minute|3 minute/.test(s))return 'poststeam';
    if(/over-proof|overproof|earlier final-proof|very puffy|fragile/.test(s))return 'overproof';
    if(/yeast activity|confirmed-fresh yeast|fresh yeast/.test(s))return 'yeast';
    if(/hydration|flour \/ hydration|liquid ratio|stiff dough|formula issue|measured flour/.test(s))return 'hydration';
    if(/under-proof|insufficient proof|proofing endpoint|plumper|finger press|final proof/.test(s))return 'underproof';
    if(clean(snapshot?.symptom)==='dense')return 'dough';
    return 'generic';
  }

  function confidenceNote(confidence,status){
    const c=clean(confidence).toUpperCase();
    if(c==='HIGH')return 'The clues you gave line up strongly with this branch. The next batch should test it directly rather than changing the whole recipe.';
    if(c==='MEDIUM')return 'This is the best current fit, but another branch is still plausible. Treat the next batch as an experiment, not a guarantee.';
    if(/CONFLICTED|NEEDS/.test(clean(status).toUpperCase()))return 'The evidence is not strong enough for a single-cause claim. The value of this plan is to separate the leading explanations with one controlled comparison.';
    return 'This is the strongest current branch from the information available. Use the next batch to confirm or reject it.';
  }

  function mechanism(category){
    const map={
      underproof:[
        'A bun can enter the steamer before fermentation has created enough gas and before the dough has expanded enough to hold that gas. The result is often a bun that stays small, feels heavy, or has a tight crumb even when the recipe itself is reasonable.',
        'The important distinction is time versus state: a fixed number of minutes is only a rough proxy. Dough temperature, room temperature and yeast activity can make the same “45 minutes” produce very different proof states.'
      ],
      overproof:[
        'When proofing goes too far, the dough can become very expanded but structurally fragile. Gas cells stretch, the supporting network weakens, and the bun has less reserve to handle the final heat expansion.',
        'That is why an over-proofed bun may look impressively puffy before steaming yet flatten, wrinkle or collapse during or after steaming. The clean test is an earlier proof endpoint, not changing yeast, flour and steaming at the same time.'
      ],
      yeast:[
        'Yeast is the gas source for this dough. If the yeast is weak, damaged, handled incorrectly or simply not active enough under the current conditions, the dough may remain tight even when you wait longer.',
        'A fresh-yeast comparison is useful because it isolates gas production from flour, hydration and steaming. If rise improves while everything else stays constant, the yeast branch gains much stronger support.'
      ],
      hydration:[
        'Flour and water determine how stiff, extensible and gas-retaining the dough feels. A dough that is too stiff for the intended style can resist expansion and produce a tighter, heavier crumb.',
        'Because adding flour “by feel” can silently change hydration from batch to batch, a measured comparison is more informative than simultaneously extending proofing or adding more yeast.'
      ],
      condensation:[
        'Steam condenses on cooler surfaces, especially the lid. If droplets fall directly onto the buns, they can damage the skin, create wet or pitted patches, and sometimes contribute to local collapse.',
        'The useful experiment is mechanical rather than formula-based: prevent water from reaching the buns while keeping the dough and steaming process otherwise the same.'
      ],
      poststeam:[
        'When steaming stops, pressure and temperature change quickly. Some buns tolerate immediate opening; others may be more sensitive depending on proof state, structure and steamer conditions.',
        'Because guidance on lid-rest is not universal, the right way to test it is an A/B comparison: equivalent buns, same cook, with only the post-steam opening/rest step changed.'
      ],
      dough:[
        'A dense crumb can come from limited gas production, but it can also come from a dough that does not expand or retain gas efficiently. Dough stiffness, hydration and development all influence the final cell structure.',
        'The goal is to avoid blaming flour, kneading and proofing all at once. One controlled change gives you evidence about which family actually matters.'
      ],
      generic:[
        'Several process failures can produce similar-looking buns, which is why changing many things at once usually creates more confusion than information.',
        'This plan turns the next batch into a controlled comparison: one major variable changes, the rest stay stable, and the result tells you which branch deserves attention next.'
      ]
    };
    return map[category]||map.generic;
  }

  function experiment(category,test){
    const base={variable:'One major process variable',insteadOf:'Changing several parts of the recipe at once',doThis:clean(test),goal:'See whether the target symptom improves when only the leading suspected variable changes.',why:'A clear improvement strengthens this diagnosis branch; no improvement tells you to move to the next branch instead of endlessly adjusting the same thing.'};
    const map={
      underproof:{variable:'Final proof endpoint',insteadOf:'Using a fixed proofing time as the only endpoint',doThis:clean(test),goal:'Test whether the buns were entering the steamer before they were sufficiently proofed.',why:'If volume and crumb improve while recipe and steaming stay the same, insufficient proofing becomes much more likely.'},
      overproof:{variable:'Final proof endpoint — earlier',insteadOf:'Waiting until the buns look maximally puffy',doThis:clean(test),goal:'Test whether the failed batch had become too expanded and structurally weak before steaming.',why:'If the earlier-proof batch keeps its height better, the over-proofing branch gains strong support.'},
      yeast:{variable:'Yeast activity / yeast handling',insteadOf:'Compensating by changing flour, water or steaming',doThis:clean(test),goal:'Test whether gas production from the yeast is the limiting factor.',why:'If a confirmed-active yeast comparison rises better with the same formula, the yeast branch is supported.'},
      hydration:{variable:'Measured flour-to-liquid ratio',insteadOf:'Adding flour or water by feel',doThis:clean(test),goal:'Test whether dough stiffness or hydration is limiting expansion and crumb softness.',why:'A cleaner rise or softer crumb after one measured hydration correction supports the formula branch.'},
      condensation:{variable:'Anti-drip / condensation control',insteadOf:'Changing dough ingredients',doThis:clean(test),goal:'Test whether direct water contact is creating the visible surface damage.',why:'If the wet or pitted symptom disappears while the dough stays the same, condensation becomes the strongest explanation.'},
      poststeam:{variable:'Post-steam lid-opening / covered-rest step',insteadOf:'Changing proofing and the cooling step together',doThis:clean(test),goal:'Test whether the transition immediately after steaming contributes to collapse or wrinkling.',why:'A consistent difference between the two equivalent groups tells you whether this transition deserves attention.'},
      dough:{variable:'The single dough/formula variable named in the plan',insteadOf:'Changing proofing, kneading and formula together',doThis:clean(test),goal:'Test whether dough structure rather than steaming is driving the dense texture.',why:'A measurable crumb improvement with the rest held constant gives you a cleaner signal about dough structure.'}
    };
    return {...base,...(map[category]||{}),doThis:clean(test)||base.doThis};
  }

  function keepUnchanged(category){
    const common=[
      'Use the same flour brand/type and weigh ingredients the same way.',
      'Keep bun size, shaping style and filling amount comparable.',
      'Keep steamer heat, water level and steaming duration the same.',
      'Do not add a second “fix” midway through the test batch.'
    ];
    const map={
      underproof:['Keep recipe weights and yeast amount unchanged.','Keep dough mixing/kneading method unchanged.','Keep bun size, shaping and filling unchanged.','Keep steamer heat and steaming time unchanged.'],
      overproof:['Keep recipe weights, yeast amount and dough temperature approach unchanged.','Keep shaping and bun size unchanged.','Keep steamer setup and cook time unchanged.','Do not reduce yeast at the same time as using an earlier proof endpoint.'],
      yeast:['Keep flour and liquid ratio unchanged.','Keep bun size, shaping and filling unchanged.','Keep proofing environment comparable.','Keep steaming setup and cook time unchanged.'],
      hydration:['Keep yeast brand and amount unchanged.','Keep proofing environment and endpoint unchanged.','Keep shaping, bun size and filling unchanged.','Keep steamer heat and steaming time unchanged.'],
      condensation:['Keep recipe, hydration and yeast unchanged.','Keep proofing endpoint unchanged.','Keep bun size and arrangement comparable.','Keep steaming heat and duration unchanged; change only the water-control setup.'],
      poststeam:['Keep recipe and proof endpoint unchanged.','Use buns of comparable size and position in the steamer.','Keep steaming heat and duration unchanged.','Change only the immediate opening/covered-rest treatment.'],
      dough:['Keep yeast amount unchanged unless the plan explicitly targets yeast.','Keep proof endpoint unchanged for this comparison.','Keep bun size and steaming setup unchanged.','Measure the targeted dough/formula change rather than adjusting by feel.']
    };
    return map[category]||common;
  }

  function beforeChecklist(category,symptom){
    const base=['Write down the one variable you are changing before you start.','Use the same scale/spoons and batch size as the failed batch.','Take one top photo before steaming so you can compare shape and volume.'];
    if(category==='underproof')base.push('Before steaming, check for visibly increased volume, a lighter feel, and a gentle press that returns slowly.');
    else if(category==='overproof')base.push('Steam before the buns become very swollen, fragile or unable to recover from a gentle press.');
    else if(category==='yeast')base.push('Confirm the comparison uses yeast you have reason to believe is active and handled as intended.');
    else if(category==='hydration')base.push('Weigh flour and liquid; do not correct the dough later with unrecorded handfuls of flour or splashes of water.');
    else if(category==='condensation')base.push('Inspect the lid/steamer arrangement and make sure condensed water cannot drip directly onto the buns.');
    else if(category==='poststeam')base.push('Prepare two equivalent groups so the only difference is the post-steam opening/rest treatment.');
    else base.push(`Record the pre-steam state of the ${clean(symptom)||'target'} symptom before changing anything else.`);
    return base;
  }

  function afterChecklist(symptom){
    const map={
      norise:['Compare final height/volume with the failed batch.','Cut one bun open and compare crumb openness and weight in the hand.','Note whether the bun retained its volume for at least several minutes after steaming.'],
      collapse:['Check whether the bun keeps its height immediately after steaming.','Re-check after about 3–5 minutes for delayed sinking.','Look for wet spots or drip marks that would point to a different branch.'],
      wrinkle:['Compare skin smoothness immediately after steaming and after cooling.','Check whether wrinkles came with volume loss or only surface texture.','Note any moisture, pits or dry-skin clues.'],
      dense:['Cut the bun through the center and compare air-cell size/distribution.','Compare softness and heaviness at the same cooling time.','Check whether the crumb is dense versus actually wet/gummy.'],
      wet:['Check for visible droplets, translucent patches or pits.','Touch the surface after brief cooling and compare tackiness.','Confirm the center is cooked so “less wet” is not coming from a different undercooking problem.']
    };
    return map[clean(symptom)]||['Compare the target symptom directly against the failed batch.','Take the same type of photo/cut-open view for both batches.','Write down what improved, what stayed the same, and any new symptom that appeared.'];
  }

  function successCriteria(symptom){
    const map={
      norise:['Before steaming, the buns are visibly plumper and feel lighter than the failed batch.','A gentle finger press returns slowly instead of snapping back immediately.','The buns gain and retain noticeably more volume after steaming.','The cut crumb is lighter and more aerated, not tight and heavy.'],
      collapse:['The buns keep their height and shape after steaming instead of spreading or sinking.','The surface remains stable during the first few minutes after heat stops.','There is no obvious new condensation damage or wet patching.','The crumb remains cooked and aerated rather than compressed by collapse.'],
      wrinkle:['The skin stays smoother after steaming and cooling.','The bun keeps its volume rather than shrinking together with the wrinkles.','No new wet spots, pits or lid-drip marks appear.','The interior texture stays comparable, showing the test mainly affected the surface/structure symptom.'],
      dense:['The cut crumb shows larger and more even air cells than the failed batch.','The bun feels lighter for the same size.','The texture is softer and less tight without becoming wet or gummy.','The outside appearance stays comparable, showing the test mainly affected interior texture.'],
      wet:['The surface is dry enough to touch without obvious droplets or translucent wet patches.','Pitting or splash-like marks are reduced or absent.','The bun keeps normal volume and shape.','The center is fully cooked, so the improvement is not simply from under-steaming.']
    };
    return map[clean(symptom)]||['The target symptom is clearly reduced compared with the failed batch.','The comparison changes only the planned major variable.','No new failure symptom appears as a side effect.','The result is clear enough to decide what to test next.'];
  }

  function branches(category,symptom,secondaryTitle){
    const fallback=stripRank(secondaryTitle)||'the next competing diagnosis branch';
    const map={
      underproof:[
        {when:'The buns rise and the crumb becomes lighter',then:'Keep this proof-state approach for another batch.',meaning:'This supports insufficient proofing as the main limiter.'},
        {when:'They are still small even after reaching the intended proof state',then:'Test yeast activity next.',meaning:'The proof endpoint changed but gas production still looks limited.'},
        {when:'They get bigger before steaming but collapse afterward',then:'Move to over-proofing / structure diagnosis.',meaning:'The problem has shifted from “not enough expansion” to “cannot hold expansion”.'}
      ],
      overproof:[
        {when:'The earlier-proof batch keeps its height better',then:'Repeat once at the same earlier endpoint.',meaning:'This supports over-proofing / weakened structure.'},
        {when:'Collapse remains and you see water or drip marks',then:'Test condensation control next.',meaning:'Moisture evidence now becomes stronger than proof-state evidence.'},
        {when:'Collapse remains with a dry surface and controlled proof',then:'Test the post-steam transition next.',meaning:'The proof branch has been weakened by the comparison.'}
      ],
      yeast:[
        {when:'Fresh/confirmed-active yeast restores normal rise',then:'Keep the formula and document the yeast handling that worked.',meaning:'This strongly supports the yeast branch.'},
        {when:'Rise is still weak with active yeast',then:'Test the proof endpoint / dough temperature next.',meaning:'Gas source is less likely to be the only limitation.'},
        {when:'Volume improves but crumb remains tight',then:'Move to hydration / dough-development diagnosis.',meaning:'You fixed gas production but not interior structure.'}
      ],
      hydration:[
        {when:'Expansion and crumb softness improve',then:'Keep the measured ratio and repeat before making another change.',meaning:'This supports a flour/hydration mismatch.'},
        {when:'The crumb stays dense but not gummy',then:'Test proof state or dough development next.',meaning:'Hydration alone did not explain the tight structure.'},
        {when:'The crumb becomes wet or gummy',then:'Re-check the magnitude of the hydration change and cooking-through.',meaning:'The correction may have gone too far or exposed a separate steaming issue.'}
      ],
      condensation:[
        {when:'Wet/pitted marks disappear with anti-drip control',then:'Keep the water-control setup.',meaning:'This strongly supports direct condensation damage.'},
        {when:'Wet areas remain without lid droplets',then:'Inspect wrapper thickness / filling moisture next.',meaning:'The moisture source is probably not direct lid drip.'},
        {when:'Surface improves but collapse remains',then:'Return to proofing / structure diagnosis.',meaning:'Condensation was real but not the only failure.'}
      ],
      poststeam:[
        {when:'The covered-rest group stays more stable',then:'Repeat the same comparison once to confirm.',meaning:'This supports sensitivity to the post-steam transition.'},
        {when:'Both groups collapse similarly',then:`Move to ${fallback}.`,meaning:'The opening/rest step did not separate the failure.'},
        {when:'Only buns with moisture marks fail',then:'Move to condensation control.',meaning:'Water contact is a stronger signal than the lid-rest timing.'}
      ],
      dough:[
        {when:'Crumb becomes lighter with the targeted dough change',then:'Repeat the measured change once.',meaning:'This supports the dough/formula branch.'},
        {when:'Crumb stays dense with good dough handling',then:'Test proof state next.',meaning:'Gas production/expansion may be the limiting factor instead.'},
        {when:'Crumb turns wet or gummy',then:'Separate hydration from cooking-through on the next test.',meaning:'The symptom is no longer simply “dense”.'}
      ]
    };
    return map[category]||[
      {when:'The target symptom clearly improves',then:'Repeat the same controlled change once.',meaning:'A repeatable improvement strengthens this diagnosis.'},
      {when:'Nothing meaningfully changes',then:`Move to ${fallback}.`,meaning:'The current branch lost support.'},
      {when:'A new symptom appears',then:'Run a fresh diagnosis using the new visible symptom.',meaning:'The experiment uncovered a different limiting factor.'}
    ];
  }

  function experimentRows(category,experiment){
    const rows=[
      {variable:'Target variable',failed:'Uncontrolled / current method',next:experiment.variable},
      {variable:'Flour + liquid',failed:'Current recipe',next:category==='hydration'?'Measured correction from the plan':'Same as failed batch'},
      {variable:'Yeast',failed:'Current method',next:category==='yeast'?'Confirmed-active / intended handling':'Same as failed batch'},
      {variable:'Final proof',failed:'Current endpoint',next:/proof/.test(category)?'Use the plan endpoint':'Same as failed batch'},
      {variable:'Steaming',failed:'Current heat + time',next:category==='poststeam'?'Same cook; only post-steam treatment differs':'Same as failed batch'},
      {variable:'Observed result',failed:'Target symptom present',next:'Record after the test'}
    ];
    return rows;
  }

  function build(snapshot){
    const ranks=Array.isArray(snapshot?.ranks)?snapshot.ranks:[];
    const answers=Array.isArray(snapshot?.answers)?snapshot.answers:[];
    const primary=ranks[0]||{};
    const secondary=ranks[1]||null;
    const rootCause=stripRank(primary.title)||clean(snapshot?.title)||'The strongest current diagnosis branch';
    const confidence=clean(primary.confidence)||clean(snapshot?.status)||'CURRENT BEST FIT';
    const test=clean(snapshot?.test)||'Repeat the batch while changing one major variable only.';
    const category=classify(snapshot,test,rootCause);
    const exp=experiment(category,test);
    const why=[];
    if(clean(primary.evidence))why.push(clean(primary.evidence));
    answers.forEach(a=>why.push(`You reported: ${clean(a)}.`));
    if(secondary&&clean(secondary.title))why.push(`The main competing explanation is ${stripRank(secondary.title)}. This experiment is designed to separate it from the leading branch instead of guessing between them.`);
    return {
      diagnosisId:clean(snapshot?.diagnosisId),
      symptom:clean(snapshot?.symptom),
      title:clean(snapshot?.title)||'Your Next-Batch Fix',
      status:clean(snapshot?.status),
      category,
      rootCause,
      confidence,
      confidenceNote:confidenceNote(confidence,snapshot?.status),
      why,
      mechanism:mechanism(category),
      experiment:exp,
      changeOnly:exp.doThis,
      keepUnchanged:keepUnchanged(category),
      beforeChecklist:beforeChecklist(category,snapshot?.symptom),
      afterChecklist:afterChecklist(snapshot?.symptom),
      successCriteria:successCriteria(snapshot?.symptom),
      branches:branches(category,snapshot?.symptom,secondary?.title),
      experimentRows:experimentRows(category,exp),
      warning:clean(snapshot?.warning),
      answers,
      ranks:ranks.map(r=>({title:stripRank(r.title),evidence:clean(r.evidence),confidence:clean(r.confidence)}))
    };
  }

  function toText(plan){
    const lines=[
      'BAO RESCUE LAB REPORT — YOUR NEXT-BATCH FIX','',
      `Diagnosis: ${plan.rootCause}`,
      `Confidence: ${plan.confidence}`,
      `Experiment variable: ${plan.experiment.variable}`,
      `Goal: ${plan.experiment.goal}`,'',
      'WHY THIS DIAGNOSIS:',...plan.why.map(x=>`- ${x}`),'',
      'WHAT PROBABLY HAPPENED:',...plan.mechanism.map(x=>`- ${x}`),'',
      'CHANGE ONLY THIS:',plan.changeOnly,'',
      'KEEP THESE UNCHANGED:',...plan.keepUnchanged.map(x=>`- ${x}`),'',
      'BEFORE STEAMING CHECKLIST:',...plan.beforeChecklist.map(x=>`[ ] ${x}`),'',
      'AFTER STEAMING CHECKLIST:',...plan.afterChecklist.map(x=>`[ ] ${x}`),'',
      'SUCCESS CRITERIA:',...plan.successCriteria.map(x=>`- ${x}`),'',
      'IF IT STILL FAILS:'
    ];
    plan.branches.forEach(b=>lines.push(`- If: ${b.when}\n  Then: ${b.then}\n  Meaning: ${b.meaning}`));
    lines.push('','EXPERIMENT RECORD:');
    plan.experimentRows.forEach(r=>lines.push(`- ${r.variable}: failed batch = ${r.failed}; next batch = ${r.next}`));
    if(plan.warning)lines.push('',`IMPORTANT NOTE: ${plan.warning}`);
    if(plan.answers.length)lines.push('','YOUR DIAGNOSIS RECORD:',...plan.answers.map(x=>`- ${x}`));
    return lines.join('\n');
  }

  window.BaoPremiumPlan={build,toText};
})();
