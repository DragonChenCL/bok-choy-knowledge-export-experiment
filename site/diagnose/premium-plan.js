(()=>{
  function clean(value){return String(value||'').trim();}

  function keepUnchanged(test){
    const t=clean(test).toLowerCase();
    if(/hydration|flour|liquid|formula|ratio/.test(t)){
      return [
        'Keep the yeast brand and amount unchanged.',
        'Keep the proofing environment and endpoint unchanged.',
        'Keep bun size, shaping method, steamer heat and steaming time unchanged.',
        'Measure flour and liquid by weight so the hydration change is the only major variable.'
      ];
    }
    if(/yeast/.test(t)){
      return [
        'Keep the flour and liquid ratio unchanged.',
        'Keep bun size, shaping method and filling unchanged.',
        'Keep the proofing environment and steaming setup unchanged.',
        'Use the same proof-state cues instead of compensating with extra time.'
      ];
    }
    if(/proof|puff|finger|plumper|earlier final/.test(t)){
      return [
        'Keep the recipe weights and yeast amount unchanged.',
        'Keep bun size, shaping method and filling unchanged.',
        'Keep steamer heat and steaming time unchanged.',
        'Change only the final proof endpoint for this comparison.'
      ];
    }
    if(/anti-drip|condensation|water|lid|droplet/.test(t)){
      return [
        'Keep the recipe and hydration unchanged.',
        'Keep proofing time/state unchanged.',
        'Keep bun size, steamer heat and steaming time unchanged.',
        'Change only the setup that prevents condensed water from reaching the buns.'
      ];
    }
    if(/covered rest|opened immediately|3-minute|3 minute|post-steam/.test(t)){
      return [
        'Keep the recipe and proof endpoint unchanged.',
        'Keep bun size and shaping unchanged.',
        'Keep steamer heat and steaming time unchanged.',
        'Change only the lid-opening / covered-rest step between the comparison groups.'
      ];
    }
    return [
      'Keep the recipe weights unchanged unless the plan explicitly targets the formula.',
      'Keep the yeast amount and brand unchanged unless the plan explicitly targets yeast.',
      'Keep bun size, shaping method and filling unchanged.',
      'Keep steamer heat and steaming time unchanged unless the plan explicitly targets that step.'
    ];
  }

  function successCriteria(symptom){
    switch(clean(symptom)){
      case 'norise': return [
        'Before steaming, the buns are visibly plumper and feel lighter than the failed batch.',
        'A gentle finger press returns slowly instead of snapping back immediately.',
        'The buns gain and retain noticeably more volume after steaming.',
        'The cut crumb is lighter and more aerated, not tight and heavy.'
      ];
      case 'collapse': return [
        'The buns keep their height and shape after steaming instead of spreading or sinking.',
        'The surface remains stable during the first few minutes after heat stops.',
        'There is no obvious new condensation damage or wet patching.',
        'The crumb remains cooked and aerated rather than compressed by collapse.'
      ];
      case 'wrinkle': return [
        'The skin stays smoother after steaming and cooling.',
        'The bun keeps its volume rather than shrinking together with the wrinkles.',
        'No new wet spots, pits or lid-drip marks appear.',
        'The interior texture stays comparable, so the improvement is not caused by changing several variables at once.'
      ];
      case 'dense': return [
        'The cut crumb shows larger and more even air cells than the failed batch.',
        'The bun feels lighter for the same size.',
        'The texture is softer and less tight without becoming wet or gummy.',
        'The outside appearance stays comparable, showing the test mainly affected the interior texture.'
      ];
      case 'wet': return [
        'The surface comes out dry enough to touch without obvious droplets or translucent wet patches.',
        'Pitting or splash-like marks are reduced or absent.',
        'The bun keeps normal volume and shape.',
        'The center is fully cooked, so the improvement is not simply from under-steaming.'
      ];
      default: return [
        'The target symptom is clearly reduced compared with the failed batch.',
        'The comparison batch changes only the planned major variable.',
        'No new failure symptom appears as a side effect.',
        'You can describe the result clearly enough to decide what to test next.'
      ];
    }
  }

  function build(snapshot){
    const ranks=Array.isArray(snapshot?.ranks)?snapshot.ranks:[];
    const answers=Array.isArray(snapshot?.answers)?snapshot.answers:[];
    const primary=ranks[0]||{};
    const secondary=ranks[1]||null;
    const rootCause=clean(primary.title)||clean(snapshot?.title)||'The strongest current diagnosis branch';
    const confidence=clean(primary.confidence)||clean(snapshot?.status)||'CURRENT BEST FIT';
    const test=clean(snapshot?.test)||'Repeat the batch while changing one major variable only.';
    const why=[];
    if(clean(primary.evidence))why.push(clean(primary.evidence));
    if(answers.length)why.push(`Your diagnosis answers were: ${answers.join('; ')}.`);
    if(ranks.length>1&&clean(secondary?.title))why.push(`The next competing explanation is ${clean(secondary.title)}, so the first test should separate these two branches rather than changing several things together.`);
    const next=secondary&&clean(secondary.title)
      ? `If the target symptom does not improve, keep the settings from this test documented and move to the next candidate: ${clean(secondary.title)}. Change only one variable related to that branch.`
      : 'If the target symptom does not improve, keep this batch documented, return to the diagnosis, and test one new evidence-backed variable rather than changing the whole recipe.';
    return {
      diagnosisId:clean(snapshot?.diagnosisId),
      title:clean(snapshot?.title)||'Your Next-Batch Fix',
      status:clean(snapshot?.status),
      rootCause,
      confidence,
      why,
      changeOnly:test,
      keepUnchanged:keepUnchanged(test),
      successCriteria:successCriteria(snapshot?.symptom),
      ifStillFails:next,
      warning:clean(snapshot?.warning),
      answers,
      ranks
    };
  }

  function toText(plan){
    const lines=[
      'Bao Rescue — Your Next-Batch Fix',
      '',
      `Most likely root cause: ${plan.rootCause}`,
      `Confidence: ${plan.confidence}`,
      '',
      'Why we think this:',
      ...plan.why.map(x=>`- ${x}`),
      '',
      'CHANGE ONLY THIS:',
      plan.changeOnly,
      '',
      'Keep these unchanged:',
      ...plan.keepUnchanged.map(x=>`- ${x}`),
      '',
      'Success criteria:',
      ...plan.successCriteria.map(x=>`- ${x}`),
      '',
      'If it still fails:',
      plan.ifStillFails
    ];
    if(plan.warning)lines.push('',`Important note: ${plan.warning}`);
    if(plan.answers.length)lines.push('','Your diagnosis record:',...plan.answers.map(x=>`- ${x}`));
    return lines.join('\n');
  }

  window.BaoPremiumPlan={build,toText};
})();
