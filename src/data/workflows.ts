import type { HarnessId, LessonSection, WorkflowStep } from '../types/course'
import type { LessonInput, ModuleInput } from './courseBuilder'
import { harnessMeta, harnessOrder } from './harnessMeta'
import { decisionChecklist } from './sharedSections'

function workflowGuide(input: Extract<LessonSection, { kind: 'workflowGuide' }>): LessonSection {
  return input
}

type BusinessWorkflowTheme = {
  title: string
  shortTitle: string
  summary: string
  audience: string
  businessOutcome: string
  leadSources: string
  stageModel: string
  captureFields: string
  draftAssets: string
  riskReview: string
  cadence: string
  primaryMetric: string
  secondaryMetric: string
  requiredInputs: string[]
  commonMistakes: string[]
}

type HarnessWorkflowProfile = {
  id: HarnessId
  moduleSummary: string
  introSummary: string
  introOutcome: string
  diagramId: string
  workflowArtifact: string
  buildIntroSteps: () => WorkflowStep[]
  buildThemeSteps: (theme: BusinessWorkflowTheme) => WorkflowStep[]
  operatingGuidance: (theme?: BusinessWorkflowTheme) => string[]
  technicalDeepDive: (theme: BusinessWorkflowTheme) => string[]
  safetyGates: (theme: BusinessWorkflowTheme) => string[]
}

const sourceNote =
  'Business workflow defaults: capture leads in one place, segment by journey stage, generate reviewed drafts, keep approval before outreach, and measure the next action every week.'

const businessThemes: BusinessWorkflowTheme[] = [
  {
    title: 'Real Estate Agent Marketing and Outreach Funnel',
    shortTitle: 'real estate funnel',
    summary: 'Build a buyer, seller, referral, and open-house follow-up system for one selected harness.',
    audience: 'A solo real estate agent or small team handling open-house, referral, portal, and website leads.',
    businessOutcome:
      'Every lead is tagged by source and intent, receives a reviewed response, and has a clear next human action.',
    leadSources: 'open houses, listing portals, website forms, referrals, Instagram, and newsletters',
    stageModel: 'new, contacted, buyer consult, seller consult, active search, nurture, closed, referral',
    captureFields:
      'name, source, buyer_or_seller, area, timeframe, consent, last_touch_at, next_action, and risk_notes',
    draftAssets: 'open-house thank-you, seller valuation follow-up, buyer checklist follow-up, and referral note',
    riskReview: 'market claims, property facts, fair housing risk, contract language, financing statements, and consent',
    cadence: 'same-day first response, two-day resource, one-week check-in, then monthly consented nurture',
    primaryMetric: 'qualified buyer or seller consults booked',
    secondaryMetric: 'stale qualified leads with no next action',
    requiredInputs: [
      'Service area, property types, and buyer or seller specialization.',
      'Allowed lead sources and the consent status for each source.',
      'CRM stages or spreadsheet columns for buyer, seller, referral, and open-house leads.',
      'Approved disclaimers and rules for market statements.',
      'Calendar or handoff instructions for scheduling consults.',
    ],
    commonMistakes: [
      'Letting an agent invent property facts or market claims.',
      'Using the same message for buyers, sellers, open-house guests, and referrals.',
      'Skipping consent and source tracking.',
    ],
  },
  {
    title: 'Life Coach Consultation Funnel',
    shortTitle: 'life coach funnel',
    summary: 'Turn content interest, referrals, and intake forms into reviewed consultation follow-up.',
    audience: 'A coach who wants to turn warm content engagement and referrals into fit calls without sounding automated.',
    businessOutcome:
      'Interested prospects receive useful, human-reviewed follow-up and are routed to a consult only when fit is plausible.',
    leadSources: 'Instagram, LinkedIn, webinars, referral partners, newsletter replies, and intake forms',
    stageModel: 'new, resource sent, fit unclear, consult invited, consult booked, nurture, not fit',
    captureFields:
      'name, source, topic_interest, stated_goal, urgency, consent, boundary_notes, last_touch_at, and next_action',
    draftAssets: 'welcome note, consult invitation, resource follow-up, objection response, and polite close-the-loop note',
    riskReview: 'health claims, therapy-like positioning, guarantees, vulnerable disclosures, and consent',
    cadence: 'same-day acknowledgment, three-day resource follow-up, seven-day consult invitation, then monthly value note',
    primaryMetric: 'qualified consultations booked',
    secondaryMetric: 'prospects moved to nurture or not-fit instead of being over-followed',
    requiredInputs: [
      'Specific coaching offer, ideal client profile, and outcomes stated without guarantees.',
      'List of content topics or lead magnets that create inbound interest.',
      'Fit criteria and red flags that require a human decision.',
      'Consent rules for email, SMS, or direct-message follow-up.',
      'Approved voice and boundaries for sensitive personal topics.',
    ],
    commonMistakes: [
      'Writing messages that imply therapy, diagnosis, or guaranteed transformation.',
      'Pushing a consult before fit is clear.',
      'Treating vulnerable disclosures as generic marketing copy.',
    ],
  },
  {
    title: 'Entrepreneur Founder Launch Funnel',
    shortTitle: 'founder launch funnel',
    summary: 'Coordinate waitlist, beta, investor, and customer-development follow-up with one selected harness.',
    audience: 'A founder validating an offer, building a waitlist, or preparing a small product launch.',
    businessOutcome:
      'The founder gets organized launch assets, segmented prospects, reviewed follow-up, and a weekly signal report.',
    leadSources: 'landing pages, waitlists, LinkedIn posts, communities, demo requests, beta signups, and events',
    stageModel: 'aware, waitlist, problem interview, demo invited, beta active, customer, investor or partner',
    captureFields:
      'name, source, segment, problem, company_size, urgency, willingness_to_pay, consent, next_action, and notes',
    draftAssets: 'waitlist welcome, problem-interview invite, demo follow-up, beta onboarding note, and launch update',
    riskReview: 'unsupported product claims, pricing commitments, investor statements, privacy promises, and roadmap promises',
    cadence: 'same-day waitlist confirmation, weekly launch update, interview invite within three days, post-demo follow-up next day',
    primaryMetric: 'qualified interviews, demos, or beta activations',
    secondaryMetric: 'validated objections and conversion by source',
    requiredInputs: [
      'One-sentence product promise and target customer segment.',
      'Waitlist, demo, or beta signup source.',
      'Segmentation rules for buyers, users, partners, and investors.',
      'Claims that are approved versus still unproven.',
      'A place to track interviews, demos, objections, and next actions.',
    ],
    commonMistakes: [
      'Automating launch claims before the positioning is validated.',
      'Mixing investors, users, and buyers in the same follow-up path.',
      'Ignoring objections that should change the product or offer.',
    ],
  },
  {
    title: 'Consultant or Agency Client Acquisition Funnel',
    shortTitle: 'consulting funnel',
    summary: 'Create a practical lead qualification and proposal-support system for one selected harness.',
    audience: 'A consultant, freelancer, or agency owner working referrals, outbound lists, and inbound inquiries.',
    businessOutcome:
      'Potential clients are qualified, followed up with reviewed messages, and moved toward a diagnostic call or proposal.',
    leadSources: 'referrals, LinkedIn, partner lists, website forms, past clients, webinars, and niche communities',
    stageModel: 'new, researched, fit likely, diagnostic invited, proposal needed, follow-up, closed, not fit',
    captureFields:
      'company, contact, source, pain_point, budget_signal, urgency, authority, consent, last_touch_at, next_action',
    draftAssets: 'referral thank-you, diagnostic-call invite, case-study follow-up, proposal recap, and reactivation note',
    riskReview: 'client confidentiality, inflated case-study claims, pricing promises, scope promises, and consent',
    cadence: 'same-day inbound reply, two-day value follow-up, one-week case-study follow-up, quarterly past-client check-in',
    primaryMetric: 'qualified diagnostic calls booked',
    secondaryMetric: 'proposal win rate and stale proposal follow-ups',
    requiredInputs: [
      'Core offer, industries served, disqualifiers, and proof points.',
      'Lead source and relationship context for each contact.',
      'Qualification criteria for pain, budget, timing, authority, and fit.',
      'Approved case studies and claims that can be reused.',
      'Proposal handoff and human review rules.',
    ],
    commonMistakes: [
      'Sending generic outreach that ignores the lead source or relationship.',
      'Letting the agent promise scope, timelines, or pricing.',
      'Treating weak-fit leads as automation volume instead of filtering them out.',
    ],
  },
  {
    title: 'Local Service Business Lead Follow-Up Funnel',
    shortTitle: 'local service funnel',
    summary: 'Manage quote requests, missed calls, reviews, and follow-up for a service business using one selected harness.',
    audience: 'A local service owner handling calls, quote forms, referrals, missed inquiries, and review requests.',
    businessOutcome:
      'New inquiries get fast reviewed responses, jobs are scheduled or qualified, and missed opportunities are followed up safely.',
    leadSources: 'Google Business Profile, website quote forms, missed calls, referrals, Yelp, Facebook, and repeat customers',
    stageModel: 'new request, needs info, quote ready, scheduled, completed, review requested, nurture, not serviceable',
    captureFields:
      'name, source, service_needed, location, urgency, consent, preferred_contact, last_touch_at, next_action',
    draftAssets: 'quote-request response, missing-info request, scheduling follow-up, review request, and seasonal reminder',
    riskReview: 'licensed-service claims, emergency advice, pricing guarantees, availability, unsafe instructions, and consent',
    cadence: 'same-day response, next-day missing-info reminder, three-day quote follow-up, post-job review request',
    primaryMetric: 'qualified jobs scheduled',
    secondaryMetric: 'missed inquiries recovered and quote follow-up completion',
    requiredInputs: [
      'Service area, service types, emergency boundaries, and license or insurance language.',
      'Lead source and preferred contact method.',
      'Scheduling rules, availability constraints, and handoff process.',
      'Quote rules and what the agent must never price without review.',
      'Consent rules for text, email, and phone follow-up.',
    ],
    commonMistakes: [
      'Letting automation give emergency, safety, legal, or licensed advice.',
      'Quoting prices or availability without human confirmation.',
      'Following up too aggressively after a missed inquiry.',
    ],
  },
  {
    title: 'Creator Course or Newsletter Audience Funnel',
    shortTitle: 'creator audience funnel',
    summary: 'Turn subscribers and content engagement into reviewed offers, launches, and audience research.',
    audience: 'A creator, educator, or newsletter operator building a course, cohort, paid community, or sponsorship pipeline.',
    businessOutcome:
      'Subscribers are segmented by interest, get useful reviewed follow-up, and produce better launch and content signals.',
    leadSources: 'newsletter forms, course waitlists, webinars, social posts, downloads, surveys, and community replies',
    stageModel: 'subscriber, engaged, topic interest, waitlist, buyer, churn risk, advocate, sponsor prospect',
    captureFields:
      'email, source, topic_interest, engagement_signal, purchase_interest, consent, last_touch_at, next_action',
    draftAssets: 'welcome sequence, topic survey, waitlist update, launch email, sponsor intro, and post-purchase check-in',
    riskReview: 'earnings claims, educational guarantees, affiliate disclosures, privacy promises, and consent',
    cadence: 'welcome immediately, topic survey after engagement, launch updates weekly, post-purchase check-in within a week',
    primaryMetric: 'qualified waitlist joins, replies, or purchases',
    secondaryMetric: 'engagement by topic and unsubscribes or complaints',
    requiredInputs: [
      'Audience promise, topics, offer, and launch calendar.',
      'Subscriber source and consent status.',
      'Segments for beginners, advanced readers, buyers, and sponsors.',
      'Approved claims, disclosures, and tone rules.',
      'Newsletter or course platform export fields.',
    ],
    commonMistakes: [
      'Letting content automation flatten the creator voice.',
      'Making unsupported income, outcome, or learning guarantees.',
      'Ignoring unsubscribes, complaints, and consent signals.',
    ],
  },
]

const profiles: Record<HarnessId, HarnessWorkflowProfile> = {
  codex: {
    id: 'codex',
    moduleSummary:
      'Use Codex to turn business workflow requirements into repo-backed templates, scripts, tests, documentation, and reviewable diffs.',
    introSummary: 'Learn how Codex approaches workflow work through files, diffs, tests, and human review.',
    introOutcome:
      'A repository-backed workflow kit with prompts, templates, import files, validation checks, and a review path.',
    diagramId: 'codex-loop',
    workflowArtifact: 'repo-backed workflow artifact',
    buildIntroSteps: () => [
      {
        title: 'Create a repo task',
        plainEnglish:
          'Write the workflow as a product requirement: audience, inputs, outputs, safety rules, and verification steps.',
        examplePrompt:
          'Use Codex to inspect this repo and propose a minimal workflow kit before editing files. Keep the plan small and testable.',
        harnessAction: 'Ground the automation in files and propose a patch plan before changing anything.',
      },
      {
        title: 'Add templates',
        plainEnglish:
          'Create markdown, CSV, or JSON templates that a non-technical operator can fill in before running the workflow.',
        examplePrompt:
          'Use Codex to add a workflow template, lead CSV example, and README instructions for this business process.',
        harnessAction: 'Create durable repo artifacts instead of one-off chat output.',
      },
      {
        title: 'Add checks',
        plainEnglish:
          'Write lightweight validation for required fields, consent flags, and approval status.',
        examplePrompt:
          'Use Codex to add a validation script and tests that fail when consent, next_action, or approval_status is missing.',
        harnessAction: 'Make quality rules executable where practical.',
      },
      {
        title: 'Review the diff',
        plainEnglish:
          'Inspect the changed files and run available checks before using the workflow with real contacts.',
        examplePrompt:
          'Use Codex to summarize the diff, tests run, risks, and manual checks I should do before using this workflow.',
        harnessAction: 'Make implementation review part of the operating process.',
      },
      {
        title: 'Iterate from evidence',
        plainEnglish:
          'After a week, update templates and tests based on real failures and repeated operator edits.',
        examplePrompt:
          'Use Codex to update this workflow kit from these operator notes and add a regression test for the mistake we saw.',
        harnessAction: 'Turn repeated mistakes into better files and checks.',
      },
    ],
    buildThemeSteps: (theme) => [
      {
        title: 'Write the workflow requirement',
        plainEnglish: `Document the ${theme.shortTitle}: lead sources, stages, fields, draft assets, approval rules, and metrics.`,
        examplePrompt: `Use Codex to create a markdown requirement for a ${theme.shortTitle}. Include ${theme.leadSources}, stages (${theme.stageModel}), required fields (${theme.captureFields}), and review rules for ${theme.riskReview}.`,
        harnessAction: 'Create a reviewable requirement file that defines the workflow before assets are generated.',
      },
      {
        title: 'Create the intake template',
        plainEnglish: `Build a CSV or JSON template that captures ${theme.captureFields}.`,
        examplePrompt: `Use Codex to add a sample CSV and validation notes for ${theme.captureFields}. The template should make consent and next_action required.`,
        harnessAction: 'Produce structured input files a person can fill in safely.',
      },
      {
        title: 'Generate reusable draft assets',
        plainEnglish: `Create checked-in templates for ${theme.draftAssets}, with placeholders instead of invented facts.`,
        examplePrompt: `Use Codex to create markdown templates for ${theme.draftAssets}. Use placeholders for facts that require human confirmation.`,
        harnessAction: 'Keep outreach drafts as editable files with clear placeholders.',
      },
      {
        title: 'Add verification checks',
        plainEnglish: `Add tests or checklists that catch missing source, consent, stage, and approval fields before the workflow is used.`,
        examplePrompt: `Use Codex to add a validation script that checks every lead row has source, consent, stage, last_touch_at, and next_action before drafts are prepared.`,
        harnessAction: 'Make common data mistakes visible before a human reviews messages.',
      },
      {
        title: 'Document the operator runbook',
        plainEnglish: `Write plain instructions for running the ${theme.shortTitle}, reviewing drafts, and recording outcomes.`,
        examplePrompt: `Use Codex to write a README for the ${theme.shortTitle}. Include the weekly cadence (${theme.cadence}) and the manual approval rule before outreach.`,
        harnessAction: 'Convert the workflow into repeatable operator instructions.',
      },
      {
        title: 'Improve from weekly results',
        plainEnglish: `Use weekly notes to update templates, checks, and documentation around ${theme.primaryMetric}.`,
        examplePrompt: `Use Codex to update the workflow kit based on this weekly report. Add a regression check for stale leads and improve the templates that produced low-quality drafts.`,
        harnessAction: 'Patch the workflow artifacts based on measured failures.',
      },
    ],
    operatingGuidance: () => [
      'Use Codex when the workflow should live in a repo as files, templates, scripts, tests, and documentation.',
      'Keep real contact data out of prompts unless the repo and runtime are approved for that data.',
      'Ask for a plan, patch, test result, and review summary before trusting the generated workflow.',
      'Treat Codex output as implementation support; a human still approves outreach and business claims.',
    ],
    technicalDeepDive: (theme) => [
      `Add a schema or validation script for ${theme.captureFields}.`,
      `Check in approved templates for ${theme.draftAssets} with placeholders for human-confirmed facts.`,
      'Add tests that fail when consent, approval_status, source, or next_action is missing.',
      'Create a README with run commands, rollback notes, and the human review checklist.',
      `Track ${theme.primaryMetric} and ${theme.secondaryMetric} in a lightweight report file.`,
    ],
    safetyGates: (theme) => [
      'Human approval required before any outbound message leaves the business.',
      `Do not generate unverified claims related to ${theme.riskReview}.`,
      'Do not commit secrets, private contact exports, or sensitive customer notes.',
      'Stop if required fields, consent, approval status, or source are missing.',
    ],
  },
  'claude-cowork': {
    id: 'claude-cowork',
    moduleSummary:
      'Use Claude Cowork to turn messy intent into structured plans, reviewed drafts, critique passes, and decision-ready artifacts.',
    introSummary: 'Learn how Claude Cowork approaches workflow work through structured reasoning and collaborative iteration.',
    introOutcome:
      'A practical planning workspace with audience definition, journey map, draft sequence, critique checklist, and review notes.',
    diagramId: 'claude-cowork-loop',
    workflowArtifact: 'planning and drafting workspace',
    buildIntroSteps: () => [
      {
        title: 'Clarify intent',
        plainEnglish:
          'Start with the goal, audience, offer, constraints, and what the human wants to decide.',
        examplePrompt:
          'Use Claude Cowork to turn this messy workflow idea into goals, assumptions, risks, open questions, and first draft steps.',
        harnessAction: 'Convert vague intent into a structured plan.',
      },
      {
        title: 'Map the journey',
        plainEnglish:
          'Describe the human journey from first signal to next action, including where the workflow must stop.',
        examplePrompt:
          'Use Claude Cowork to map this funnel into journey stages, lead signals, follow-up ideas, and stop conditions.',
        harnessAction: 'Create a readable operating model before writing messages.',
      },
      {
        title: 'Draft artifacts',
        plainEnglish:
          'Draft intake questions, follow-up messages, checklists, and review notes in separate sections.',
        examplePrompt:
          'Use Claude Cowork to draft the outreach sequence, intake questions, and review checklist as separate artifacts.',
        harnessAction: 'Produce structured artifacts a human can critique.',
      },
      {
        title: 'Critique the result',
        plainEnglish:
          'Ask for weaknesses: tone, missing context, legal or policy risk, assumptions, and likely failure modes.',
        examplePrompt:
          'Use Claude Cowork to critique these drafts for accuracy, consent, tone, risk, and unclear assumptions.',
        harnessAction: 'Use critique as a normal step, not an afterthought.',
      },
      {
        title: 'Create the operating checklist',
        plainEnglish:
          'Turn the accepted draft into a checklist the operator can follow every week.',
        examplePrompt:
          'Use Claude Cowork to convert the final version into a weekly operating checklist with approval points and metrics.',
        harnessAction: 'Make the final artifact usable by a non-technical operator.',
      },
    ],
    buildThemeSteps: (theme) => [
      {
        title: 'Clarify the offer and audience',
        plainEnglish: `Turn the rough ${theme.shortTitle} into a clear promise, audience, objections, and boundaries.`,
        examplePrompt: `Use Claude Cowork to clarify my ${theme.shortTitle}. Audience: ${theme.audience}. Outcome: ${theme.businessOutcome}. List assumptions, objections, and questions I must answer before outreach.`,
        harnessAction: 'Structure the business intent before drafting messages.',
      },
      {
        title: 'Map the journey stages',
        plainEnglish: `Define stages such as ${theme.stageModel} and explain what a human should do at each stage.`,
        examplePrompt: `Use Claude Cowork to map ${theme.stageModel} into plain-English journey stages with lead signals, next human action, and stop conditions.`,
        harnessAction: 'Turn the funnel into an understandable operating path.',
      },
      {
        title: 'Draft follow-up assets',
        plainEnglish: `Write first drafts for ${theme.draftAssets}, keeping the tone specific to the lead source.`,
        examplePrompt: `Use Claude Cowork to draft ${theme.draftAssets}. Keep each message short, source-aware, and marked as draft-only until I approve it.`,
        harnessAction: 'Create high-quality draft copy without sending anything.',
      },
      {
        title: 'Run a critique pass',
        plainEnglish: `Review the drafts for ${theme.riskReview}, weak assumptions, excessive pressure, and missing context.`,
        examplePrompt: `Use Claude Cowork to critique these ${theme.shortTitle} drafts for ${theme.riskReview}, consent, tone, and unsupported claims. Return edits and reasons.`,
        harnessAction: 'Improve quality through explicit review and revision.',
      },
      {
        title: 'Create the operator checklist',
        plainEnglish: `Write the step-by-step checklist for using the drafts, approving outreach, and tracking ${theme.primaryMetric}.`,
        examplePrompt: `Use Claude Cowork to turn this ${theme.shortTitle} into a weekly checklist with required inputs, approval steps, cadence (${theme.cadence}), and metrics.`,
        harnessAction: 'Make the workflow usable without needing technical setup.',
      },
      {
        title: 'Summarize the weekly review',
        plainEnglish: `Use the week of notes to identify what improved ${theme.primaryMetric} and what created stalled leads.`,
        examplePrompt: `Use Claude Cowork to summarize this week's ${theme.shortTitle} notes into wins, bottlenecks, risky assumptions, and three changes to test next week.`,
        harnessAction: 'Help the operator make better decisions from messy notes.',
      },
    ],
    operatingGuidance: () => [
      'Use Claude Cowork for planning, drafting, critique, synthesis, and decision support.',
      'Keep the workflow collaborative: the human supplies facts, constraints, and approval.',
      'Ask for assumptions and open questions whenever the output could affect customers.',
      'Store accepted plans and templates in project instructions or shared documents for reuse.',
    ],
    technicalDeepDive: (theme) => [
      `Create a project document that defines ${theme.stageModel}, fields, and approval rules.`,
      `Maintain approved examples for ${theme.draftAssets} so future drafts match the business voice.`,
      'Use a critique checklist for consent, unsupported claims, sensitive data, and pressure tactics.',
      'Keep a weekly review artifact that separates facts, interpretations, and recommended changes.',
      `Track ${theme.primaryMetric} and ${theme.secondaryMetric} in a simple table for pattern review.`,
    ],
    safetyGates: (theme) => [
      'Human approval required before any outbound message is sent.',
      `Escalate or remove claims involving ${theme.riskReview}.`,
      'Do not include private lead data beyond what the operator is allowed to use.',
      'Stop when fit, consent, source, or the next human action is unclear.',
    ],
  },
  openclaw: {
    id: 'openclaw',
    moduleSummary:
      'Use OpenClaw to run local, message-driven workflow skills over browser, file, and shell tasks with operator supervision.',
    introSummary: 'Learn how OpenClaw approaches workflow work through local skills, messages, tools, and workspace memory.',
    introOutcome:
      'A supervised local workflow skill that reads approved inputs, prepares drafts or summaries, and waits for human review.',
    diagramId: 'openclaw-gateway-loop',
    workflowArtifact: 'local workspace skill',
    buildIntroSteps: () => [
      {
        title: 'Create a workspace skill',
        plainEnglish:
          'Write the skill purpose, triggers, inputs, allowed tools, outputs, and stop conditions.',
        examplePrompt:
          'Use OpenClaw to draft a workspace skill that reads an approved lead export and creates review-only follow-up drafts.',
        harnessAction: 'Package repeated local work into a named skill.',
      },
      {
        title: 'Connect approved local inputs',
        plainEnglish:
          'Use exported files or approved browser pages first. Avoid broad account access until the manual version works.',
        examplePrompt:
          'Use OpenClaw to inspect this exported CSV and summarize missing next actions without writing changes.',
        harnessAction: 'Start with read-only local context.',
      },
      {
        title: 'Run the skill by message',
        plainEnglish:
          'Ask for one bounded run: read inputs, prepare outputs, and report what it did.',
        examplePrompt:
          'Use OpenClaw to run the lead-follow-up skill on this file and produce drafts for review only.',
        harnessAction: 'Execute a bounded local workflow from a message.',
      },
      {
        title: 'Review outputs',
        plainEnglish:
          'A person reviews generated drafts, summaries, and any proposed tool action before anything external changes.',
        examplePrompt:
          'Use OpenClaw to list the exact messages, records, or browser actions that would be needed next, then stop.',
        harnessAction: 'Keep proposed actions visible before execution.',
      },
      {
        title: 'Improve the skill',
        plainEnglish:
          'Move repeated corrections into the skill file so future runs improve.',
        examplePrompt:
          'Use OpenClaw to update the skill instructions with these three operator corrections and keep the workflow approval-only.',
        harnessAction: 'Turn operator feedback into better local skill behavior.',
      },
    ],
    buildThemeSteps: (theme) => [
      {
        title: 'Write the local skill',
        plainEnglish: `Create a skill for the ${theme.shortTitle} with allowed inputs, output format, and stop conditions.`,
        examplePrompt: `Use OpenClaw to create a workspace skill for a ${theme.shortTitle}. It should read approved lead exports, use stages (${theme.stageModel}), and prepare review-only outputs.`,
        harnessAction: 'Define the repeated workflow as a local skill.',
      },
      {
        title: 'Load the approved lead export',
        plainEnglish: `Use a CRM export or spreadsheet with ${theme.captureFields}. Keep the first version read-only.`,
        examplePrompt: `Use OpenClaw to inspect this exported lead file for ${theme.captureFields}. Summarize missing fields and do not write changes.`,
        harnessAction: 'Read local data and report gaps before generating drafts.',
      },
      {
        title: 'Prepare drafts or tasks',
        plainEnglish: `Generate drafts for ${theme.draftAssets} or task notes for leads that need a human decision.`,
        examplePrompt: `Use OpenClaw to prepare review-only drafts for ${theme.draftAssets}. Mark any lead with unclear consent or missing context as needs-human-review.`,
        harnessAction: 'Create local draft artifacts without sending or writing to external systems.',
      },
      {
        title: 'Check approval boundaries',
        plainEnglish: `Before any browser or file write, confirm the exact record, message, and reason with the operator.`,
        examplePrompt: `Use OpenClaw to show me the exact proposed updates for this ${theme.shortTitle}. Stop before browser actions, sends, or file writes.`,
        harnessAction: 'Pause at the boundary where a tool action would affect real systems.',
      },
      {
        title: 'Run supervised updates',
        plainEnglish: `Only after review, use the local workflow to help with approved copy/paste, file organization, or task creation.`,
        examplePrompt: `Use OpenClaw to help me create approved follow-up tasks from this reviewed list. Ask before every browser write or external change.`,
        harnessAction: 'Assist with local execution while keeping approval in the loop.',
      },
      {
        title: 'Summarize the run',
        plainEnglish: `Create a weekly summary of ${theme.primaryMetric}, ${theme.secondaryMetric}, missing data, and recommended skill edits.`,
        examplePrompt: `Use OpenClaw to summarize this week's ${theme.shortTitle} exports, stale leads, missing next actions, and suggested skill improvements.`,
        harnessAction: 'Produce an operator-facing report from local workflow evidence.',
      },
    ],
    operatingGuidance: () => [
      'Use OpenClaw when the workflow needs local files, browser pages, shell commands, or message-driven control.',
      'Begin with read-only exports and draft-only outputs before allowing writes.',
      'Keep allowed tools, skill triggers, and stop conditions explicit in the workspace skill.',
      'Require the operator to approve browser writes, sends, deletions, and irreversible file actions.',
    ],
    technicalDeepDive: (theme) => [
      `Create a workspace skill with triggers for ${theme.shortTitle} and explicit input paths.`,
      `Define output files for review-only drafts, missing-field reports, and next-action summaries.`,
      'Add browser automation only after the exported-file version proves useful.',
      'Log every run with input file name, operator, proposed actions, approvals, and final status.',
      `Add skill examples for leads at stages: ${theme.stageModel}.`,
    ],
    safetyGates: (theme) => [
      'Human approval required before browser writes, sends, CRM updates, or file deletion.',
      `Stop when a lead requires review for ${theme.riskReview}.`,
      'Use read-only exports before connecting live accounts.',
      'Do not scrape private or restricted systems outside allowed terms.',
    ],
  },
  nemoclaw: {
    id: 'nemoclaw',
    moduleSummary:
      'Use NemoClaw to design policy-gated, sandboxed workflow runs with approval, logging, and safer execution boundaries.',
    introSummary: 'Learn how NemoClaw approaches workflow work through policy, sandboxing, permissions, and audit trails.',
    introOutcome:
      'A guarded workflow where every risky action goes through policy checks, approval, sandboxed execution, and logged review.',
    diagramId: 'nemoclaw-policy-loop',
    workflowArtifact: 'policy-gated workflow run',
    buildIntroSteps: () => [
      {
        title: 'Define the policy',
        plainEnglish:
          'Write what the workflow can read, what it can draft, what requires approval, and what is prohibited.',
        examplePrompt:
          'Use NemoClaw to draft a policy for a lead-follow-up workflow that blocks sends, deletions, CRM writes, and payment actions without approval.',
        harnessAction: 'Make permissions explicit before execution.',
      },
      {
        title: 'Prepare the sandbox',
        plainEnglish:
          'Run the workflow against approved sample data or constrained inputs before touching real systems.',
        examplePrompt:
          'Use NemoClaw to run this workflow against sample lead data and report all policy decisions without making external changes.',
        harnessAction: 'Test behavior inside a controlled boundary.',
      },
      {
        title: 'Route risky requests',
        plainEnglish:
          'Treat sends, writes, deletes, sensitive data, and unsupported claims as policy decisions.',
        examplePrompt:
          'Use NemoClaw to classify each proposed workflow action as allowed, needs approval, or denied, with reasons.',
        harnessAction: 'Force explicit risk classification.',
      },
      {
        title: 'Require approval packets',
        plainEnglish:
          'When approval is needed, show the exact action, data involved, expected result, and rollback option.',
        examplePrompt:
          'Use NemoClaw to create approval packets for these proposed outreach actions and stop until I approve each one.',
        harnessAction: 'Make human approval informed and auditable.',
      },
      {
        title: 'Audit and improve',
        plainEnglish:
          'Review policy denials, approvals, and near misses to tighten the workflow.',
        examplePrompt:
          'Use NemoClaw to summarize this workflow audit log into denied actions, approved actions, risky patterns, and policy improvements.',
        harnessAction: 'Use logs to make the guarded workflow stronger.',
      },
    ],
    buildThemeSteps: (theme) => [
      {
        title: 'Write the workflow policy',
        plainEnglish: `Define allowed reads, draft outputs, approval-required actions, and prohibited actions for the ${theme.shortTitle}.`,
        examplePrompt: `Use NemoClaw to write a policy for a ${theme.shortTitle}. Required fields: ${theme.captureFields}. Approval required for outreach, record writes, deletions, and claims involving ${theme.riskReview}.`,
        harnessAction: 'Put permissions, denials, and approval requirements ahead of the workflow run.',
      },
      {
        title: 'Run on approved sample data',
        plainEnglish: `Validate the stages (${theme.stageModel}) and required fields without exposing live systems first.`,
        examplePrompt: `Use NemoClaw to run the ${theme.shortTitle} against this sample lead set and report missing fields, denied actions, and approval-required items.`,
        harnessAction: 'Prove the policy path before real execution.',
      },
      {
        title: 'Generate guarded drafts',
        plainEnglish: `Draft ${theme.draftAssets}, but tag anything uncertain as approval-required or denied.`,
        examplePrompt: `Use NemoClaw to create guarded drafts for ${theme.draftAssets}. Flag missing consent, unsupported claims, and sensitive context for approval.`,
        harnessAction: 'Produce drafts with explicit policy status.',
      },
      {
        title: 'Create approval packets',
        plainEnglish: `For each proposed outreach action, include exact text, data source, risk flags, and what happens after approval.`,
        examplePrompt: `Use NemoClaw to create approval packets for this ${theme.shortTitle}. Include action, contact, message, policy reason, risk notes, and rollback or stop option.`,
        harnessAction: 'Give the human enough context to approve or deny safely.',
      },
      {
        title: 'Execute only approved actions',
        plainEnglish: `Keep the run constrained to actions already approved by policy and the operator.`,
        examplePrompt: `Use NemoClaw to process only the approved actions in this list. Deny anything outside the approved action ids and write an audit summary.`,
        harnessAction: 'Prevent scope creep during execution.',
      },
      {
        title: 'Review the audit log',
        plainEnglish: `Summarize approvals, denials, near misses, and improvements tied to ${theme.primaryMetric}.`,
        examplePrompt: `Use NemoClaw to review the audit log for this ${theme.shortTitle}. Summarize approved actions, denied actions, unresolved risks, and policy changes needed before the next run.`,
        harnessAction: 'Use audit evidence to improve the next guarded run.',
      },
    ],
    operatingGuidance: () => [
      'Use NemoClaw when the workflow needs stronger policy, sandbox, approval, and audit boundaries.',
      'Separate draft generation from approved execution.',
      'Classify every action as allowed, needs approval, or denied before it can run.',
      'Treat audit logs as part of the product, not as optional debugging output.',
    ],
    technicalDeepDive: (theme) => [
      `Create policy rules for allowed reads, draft-only outputs, and approval-required actions in the ${theme.shortTitle}.`,
      'Use sandbox data to test prompt injection, missing consent, unsupported claims, and denied writes.',
      'Store approval packets with action id, contact id, exact message, reviewer, decision, and timestamp.',
      'Create regression tests from denied actions and policy near misses.',
      `Report ${theme.primaryMetric} only alongside policy violations, denials, and unresolved approvals.`,
    ],
    safetyGates: (theme) => [
      'Human approval required before sends, record writes, deletions, payment actions, or external changes.',
      `Deny or escalate claims involving ${theme.riskReview}.`,
      'Stop when the requested action is outside the policy scope.',
      'Do not process data without an approved source, retention rule, and audit path.',
    ],
  },
  hermes: {
    id: 'hermes',
    moduleSummary:
      'Use Hermes to package client-acquisition work into repeatable markdown-driven skills, workflow stages, memory, and review gates.',
    introSummary: 'Learn how Hermes approaches workflow work through structured skills, business artifacts, memory, and review.',
    introOutcome:
      'A repeatable workflow skill that turns a goal and context into reviewed artifacts, follow-up steps, and memory updates.',
    diagramId: 'hermes-workflow',
    workflowArtifact: 'markdown workflow skill',
    buildIntroSteps: () => [
      {
        title: 'Define the workflow goal',
        plainEnglish:
          'Write the business goal, required inputs, output artifacts, review gates, and weekly metrics.',
        examplePrompt:
          'Use Hermes to create a workflow definition for a client-acquisition funnel with drafts, approvals, and weekly review.',
        harnessAction: 'Turn the business process into a repeatable workflow.',
      },
      {
        title: 'Create the skill file',
        plainEnglish:
          'Capture triggers, context files, stages, outputs, and review rules in markdown.',
        examplePrompt:
          'Use Hermes to draft a skill file for a review-first outreach workflow with required inputs and approval gates.',
        harnessAction: 'Package the procedure so it can be reused.',
      },
      {
        title: 'Run the workflow',
        plainEnglish:
          'Run the skill to produce artifacts: segments, drafts, checklists, and review notes.',
        examplePrompt:
          'Use Hermes to run this workflow from the provided offer, audience, lead source, and constraints.',
        harnessAction: 'Generate structured artifacts from the workflow context.',
      },
      {
        title: 'Review and refine',
        plainEnglish:
          'A person reviews the artifacts, then updates the skill when corrections repeat.',
        examplePrompt:
          'Use Hermes to revise this workflow skill from my review notes and keep approval required before outreach.',
        harnessAction: 'Turn review feedback into a better workflow.',
      },
      {
        title: 'Update memory carefully',
        plainEnglish:
          'Save stable preferences, approved language, and durable business rules without storing temporary clutter.',
        examplePrompt:
          'Use Hermes to propose memory updates from this completed workflow run. Include only stable facts and approved preferences.',
        harnessAction: 'Keep useful durable context without bloating memory.',
      },
    ],
    buildThemeSteps: (theme) => [
      {
        title: 'Write the workflow brief',
        plainEnglish: `Define the ${theme.shortTitle} goal, audience, inputs, outputs, and review rules.`,
        examplePrompt: `Use Hermes to create a workflow brief for a ${theme.shortTitle}. Include ${theme.leadSources}, stages (${theme.stageModel}), required inputs, draft outputs, and approval gates.`,
        harnessAction: 'Frame the business workflow before generating artifacts.',
      },
      {
        title: 'Create the skill structure',
        plainEnglish: `Turn the process into a skill with stages for capture, segmentation, drafts, review, and weekly measurement.`,
        examplePrompt: `Use Hermes to draft a skill file for the ${theme.shortTitle}. It should require ${theme.captureFields} and produce ${theme.draftAssets}.`,
        harnessAction: 'Package the process as a reusable markdown workflow.',
      },
      {
        title: 'Run the draft artifact stage',
        plainEnglish: `Generate segments, drafts, and review notes from the provided context, without sending anything.`,
        examplePrompt: `Use Hermes to run the ${theme.shortTitle} skill and create draft artifacts for ${theme.draftAssets}. Mark every artifact as pending human review.`,
        harnessAction: 'Produce structured workflow artifacts for review.',
      },
      {
        title: 'Apply the review gate',
        plainEnglish: `Check ${theme.riskReview}, consent, source, and tone before an artifact can move forward.`,
        examplePrompt: `Use Hermes to run the review gate for this ${theme.shortTitle}. Return approved, revise, and stop categories with reasons.`,
        harnessAction: 'Move artifacts through explicit review states.',
      },
      {
        title: 'Prepare the weekly run',
        plainEnglish: `Use the cadence (${theme.cadence}) to create the next actions and review queue for the operator.`,
        examplePrompt: `Use Hermes to prepare this week's ${theme.shortTitle} action queue from the approved artifacts and cadence rules.`,
        harnessAction: 'Turn the workflow into a repeatable operating rhythm.',
      },
      {
        title: 'Refine skill and memory',
        plainEnglish: `Update the workflow skill with repeated corrections and keep stable preferences for future runs.`,
        examplePrompt: `Use Hermes to refine the ${theme.shortTitle} skill from these review notes and propose durable memory updates for approved language only.`,
        harnessAction: 'Improve repeatability without storing temporary context as durable memory.',
      },
    ],
    operatingGuidance: () => [
      'Use Hermes when the work is a repeatable business workflow with named stages and artifacts.',
      'Keep workflow rules, output formats, and review gates in markdown skill files.',
      'Use memory for stable preferences and approved language, not raw lead dumps.',
      'Require review before any generated artifact becomes external communication.',
    ],
    technicalDeepDive: (theme) => [
      `Create a skill with stages for ${theme.stageModel}.`,
      `Define artifact templates for ${theme.draftAssets} and a review-state field for each output.`,
      'Add a memory update rule that saves only durable, approved business preferences.',
      'Create a recurring weekly review workflow that reports metrics and proposed skill edits.',
      `Track ${theme.primaryMetric} and ${theme.secondaryMetric} as workflow outputs.`,
    ],
    safetyGates: (theme) => [
      'Human approval required before any generated artifact is sent, posted, or copied into a live system.',
      `Revise or stop when artifacts include ${theme.riskReview}.`,
      'Do not store raw contact lists or sensitive temporary notes as durable memory.',
      'Stop when required context, consent, or review state is missing.',
    ],
  },
}

export const workflowModules: ModuleInput[] = harnessOrder.map((harnessId) => {
  const profile = profiles[harnessId]
  const meta = harnessMeta[harnessId]

  return {
    id: `module-${meta.slug}-workflows`,
    slug: `${meta.slug}-workflows`,
    title: `${meta.title} Workflows`,
    summary: profile.moduleSummary,
    track: 'workflows',
    harnessId,
    lessons: [buildIntroLesson(profile), ...businessThemes.map((theme) => buildBusinessLesson(profile, theme))],
  }
})

function buildIntroLesson(profile: HarnessWorkflowProfile): LessonInput {
  const meta = harnessMeta[profile.id]

  return {
    title: `${meta.title} Workflow Operating Model`,
    summary: profile.introSummary,
    diagramId: profile.diagramId,
    objectives: [
      `Understand where ${meta.title} fits in a client-acquisition workflow.`,
      'Separate draft generation from human approval.',
      `Create a reusable ${profile.workflowArtifact} instead of a one-off prompt.`,
    ],
    keyConcepts: [
      `The reusable ${profile.workflowArtifact} is the source of truth for how ${meta.title} should run the workflow.`,
      'The review gate separates draft generation from outreach, posting, record writes, or other live actions.',
      'The operator checklist keeps every run tied to inputs, outputs, owner, stop conditions, and weekly improvement.',
    ],
    sections: [
      workflowGuide({
        kind: 'workflowGuide',
        title: `${meta.title} workflow operating model`,
        harnessName: meta.title,
        audience: `An operator who has chosen ${meta.title} and wants every workflow step to use that harness.`,
        outcome: profile.introOutcome,
        requiredInputs: [
          'A specific business outcome and audience.',
          'Approved lead sources and consent rules.',
          'A place to store drafts, notes, or workflow artifacts.',
          'A written human approval rule before outreach.',
          'A weekly metric and review habit.',
        ],
        steps: profile.buildIntroSteps(),
        operatingGuidance: profile.operatingGuidance(),
        safetyGates: [
          'Human approval required before outreach, posting, record writes, or destructive changes.',
          'Stop when source, consent, ownership, or next action is unclear.',
          'Do not invent customer facts, business claims, prices, guarantees, or availability.',
          'Keep private lead data out of contexts that are not approved for that data.',
        ],
        followUpCadence: [
          'First run: use sample or low-risk inputs.',
          'New lead: prepare a reviewed draft or task as soon as practical.',
          'Warm lead: prepare a useful follow-up within the promised service window.',
          'Weekly: review outcomes, stalled items, and workflow improvements.',
        ],
        successMetrics: [
          { label: 'Workflow clarity', target: 'Every run has inputs, outputs, owner, and stop conditions.' },
          { label: 'Review quality', target: 'No outbound message or live write bypasses approval.' },
          { label: 'Repeatability', target: 'The same workflow can be run again with less correction.' },
          { label: 'Business signal', target: 'The workflow improves qualified next actions, not just output volume.' },
        ],
        technicalDeepDive: [
          `Store the accepted workflow as a ${profile.workflowArtifact}.`,
          'Add examples for good inputs, bad inputs, and approval-required cases.',
          'Log every run with input source, output location, approval status, and next action.',
          'Create a weekly regression list from failures and operator corrections.',
        ],
        sourceNote,
      }),
      decisionChecklist(`Before using ${meta.title} for client acquisition`, 'Lock these constraints before adding more autonomy.', [
        'Can the harness access only the context needed for this workflow?',
        'Is every outbound communication review-first?',
        'Are consent, source, and next action tracked?',
        'Does the operator know exactly when the workflow must stop?',
        'Is there a weekly review loop?',
      ]),
    ],
    practicalExample: `Use ${meta.title} to build one small workflow around a single lead source, then improve it after a week of reviewed runs.`,
    harnessRelevance: `${meta.title} is the only harness used in this workflow track, so the operator learns its native operating model without mixed-harness advice.`,
    commonMistakes: [
      'Trying to automate every channel before one lead source works.',
      'Skipping the review gate because the first draft looks good.',
      'Treating generated copy as a sent message instead of a draft artifact.',
    ],
  }
}

function buildBusinessLesson(profile: HarnessWorkflowProfile, theme: BusinessWorkflowTheme): LessonInput {
  const meta = harnessMeta[profile.id]

  return {
    title: theme.title,
    summary: `${theme.summary} This version uses ${meta.title} only.`,
    diagramId: 'approval-outreach-flow',
    objectives: [
      `Build the ${theme.shortTitle} using ${meta.title} only.`,
      'Collect the minimum inputs needed before drafting follow-up.',
      'Keep approval before outreach and improve the workflow from weekly evidence.',
    ],
    keyConcepts: [
      `The ${theme.shortTitle} should start from approved inputs before ${meta.title} drafts or prepares follow-up.`,
      `The ${profile.workflowArtifact} keeps the process reusable instead of relying on a one-off prompt.`,
      'The approval gate must happen before outreach, publishing, CRM writes, or any customer-facing action.',
    ],
    sections: [
      workflowGuide({
        kind: 'workflowGuide',
        title: `${capitalize(theme.shortTitle)} with ${meta.title}`,
        harnessName: meta.title,
        audience: theme.audience,
        outcome: theme.businessOutcome,
        requiredInputs: theme.requiredInputs,
        steps: profile.buildThemeSteps(theme),
        operatingGuidance: profile.operatingGuidance(theme),
        safetyGates: profile.safetyGates(theme),
        followUpCadence: [
          `Primary cadence: ${theme.cadence}.`,
          'New inquiry: prepare a draft or task for review as soon as practical.',
          'Warm lead: follow up with useful context, not pressure.',
          'No response: one final value-add follow-up, then stop unless the human reopens it.',
        ],
        successMetrics: [
          { label: 'Primary conversion', target: theme.primaryMetric },
          { label: 'Quality signal', target: theme.secondaryMetric },
          { label: 'Review compliance', target: 'No outreach, live write, or public claim bypasses approval.' },
          { label: 'Workflow learning', target: 'Repeated human corrections become better instructions or templates.' },
        ],
        technicalDeepDive: profile.technicalDeepDive(theme),
        sourceNote,
      }),
      decisionChecklist(`Review the ${theme.shortTitle}`, 'Use this checklist before each live run.', [
        'Is the lead source allowed and recorded?',
        'Is consent clear for the intended follow-up channel?',
        'Are required fields present before drafting?',
        'Are risky claims removed or escalated?',
        'Does every lead have a next human action or a stop reason?',
      ]),
    ],
    practicalExample: `Run ${meta.title} against one approved ${theme.shortTitle} lead source, prepare drafts or artifacts, review them manually, and record what happened.`,
    harnessRelevance: `${meta.title} owns the whole workflow path in this lesson, from context setup through reviewed outputs and weekly improvement.`,
    commonMistakes: theme.commonMistakes,
  }
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
