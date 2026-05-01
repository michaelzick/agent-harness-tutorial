import type { LessonSection } from '../types/course'
import type { ModuleInput } from './courseBuilder'
import { decisionChecklist } from './sharedSections'

function workflowGuide(input: Extract<LessonSection, { kind: 'workflowGuide' }>): LessonSection {
  return input
}

const clientAcquisitionSourceNote =
  'Source-informed defaults: HubSpot emphasizes forms, email automation, lead scoring, and journey orchestration; Mailchimp frames customer journeys as awareness, consideration, decision, retention, and advocacy; real estate CRM guidance emphasizes fast lead response, routing, and follow-up.'

export const workflowModules: ModuleInput[] = [
  {
    id: 'module-example-workflows',
    slug: 'example-workflows',
    title: 'Example Workflows',
    summary:
      'Step-by-step client acquisition playbooks for non-technical operators, with optional technical depth for people building repeatable agentic systems.',
    track: 'workflows',
    lessons: [
      {
        title: 'Client Acquisition Workflow Template',
        summary: 'Learn the reusable pattern behind every outreach funnel before adapting it to a specific business.',
        diagramId: 'client-acquisition-funnel',
        objectives: [
          'Map a simple client acquisition funnel from offer to booked conversation.',
          'Separate human judgment from agent drafting and follow-up support.',
          'Choose where to add technical depth without making the first version fragile.',
        ],
        keyConcepts: ['offer', 'lead source', 'journey stage', 'approval gate', 'follow-up cadence'],
        sections: [
          workflowGuide({
            kind: 'workflowGuide',
            title: 'Reusable client acquisition funnel',
            audience:
              'A non-technical business owner who wants a practical system for generating, qualifying, and following up with leads.',
            outcome:
              'A repeatable workflow that turns a clear offer into reviewed outreach, captured leads, follow-up reminders, and a weekly performance review.',
            requiredInputs: [
              'One specific offer and the problem it solves.',
              'A narrow audience segment.',
              'A lead source such as referrals, LinkedIn, Instagram, open houses, events, a website form, or a newsletter.',
              'A place to track contacts, even if it is a spreadsheet at first.',
              'A written rule that agents draft messages but do not send without approval.',
            ],
            steps: [
              {
                title: 'Define the offer',
                plainEnglish:
                  'Write the simplest version of what you sell, who it helps, and what outcome the buyer wants. Do this before asking an agent to produce copy.',
                examplePrompt:
                  'Use Claude Cowork to turn this rough offer into a plain-English client promise, three objections, and a short intake question list.',
                bestHarness: 'Claude Cowork for thinking through positioning before any automation is built.',
              },
              {
                title: 'Capture leads in one place',
                plainEnglish:
                  'Choose one tracking surface. A simple CRM or spreadsheet is enough if it records name, source, interest, stage, last touch, next step, and owner.',
                examplePrompt:
                  'Use Codex to create a CSV template for leads with columns for source, stage, last_touch_at, next_action, consent, and notes.',
                bestHarness: 'Codex if you need a template or import script; Hermes if you want a repeatable workflow file.',
              },
              {
                title: 'Segment by intent',
                plainEnglish:
                  'Do not send the same message to everyone. Put each lead into a stage such as awareness, consideration, decision, retention, or referral.',
                examplePrompt:
                  'Use Claude Cowork to classify these lead notes into journey stages and explain the next best human action for each stage.',
                bestHarness: 'Claude Cowork for classification logic; NemoClaw-style policy if customer data is sensitive.',
              },
              {
                title: 'Draft outreach and follow-up',
                plainEnglish:
                  'Ask the agent for drafts, not sends. Keep the message short, specific, and tied to the lead source.',
                examplePrompt:
                  'Use Hermes to draft a three-message follow-up sequence for leads who downloaded the buyer checklist. Keep it warm, specific, and approval-only.',
                bestHarness: 'Hermes for repeatable outreach sequences; OpenClaw only for local tool support after review rules exist.',
              },
              {
                title: 'Review before sending',
                plainEnglish:
                  'A person checks accuracy, tone, consent, and timing before anything leaves the business.',
                examplePrompt:
                  'Use NemoClaw-style policies to block email sending, SMS sending, CRM writes, or public posts unless I approve the exact final message.',
                bestHarness: 'NemoClaw-style guardrails for approval gates; human owner for final judgment.',
              },
              {
                title: 'Measure and improve weekly',
                plainEnglish:
                  'Once a week, review lead source, response time, reply rate, booking rate, and where leads stall.',
                examplePrompt:
                  'Use Claude Cowork to summarize this week of lead activity into wins, bottlenecks, risky assumptions, and three changes to test next week.',
                bestHarness: 'Claude Cowork for analysis; Codex if dashboards or import scripts need to be built.',
              },
            ],
            harnessRoles: [
              'Claude Cowork: clarify offer, audience, objections, scripts, and review notes.',
              'Hermes: turn repeated campaign steps into a reusable workflow.',
              'Codex: build forms, scripts, templates, dashboards, and CRM helpers.',
              'OpenClaw: operate local browser or file workflows when a person supervises.',
              'NemoClaw: add policy, sandboxing, approvals, and audit logs for riskier actions.',
            ],
            safetyGates: [
              'Human approval required before sending emails, SMS, DMs, or posts.',
              'No scraping private or restricted data.',
              'No claims about price, guarantees, results, legal advice, or availability unless the human confirms them.',
              'Stop if consent, source, or next action is unclear.',
            ],
            followUpCadence: [
              'New inquiry: draft same-day response and ask for human approval.',
              'Warm lead: draft a helpful follow-up within two to three business days.',
              'No response: draft one final value-add message after a week, then stop unless the human reopens it.',
              'Past client or subscriber: send useful updates only on a consented schedule.',
            ],
            successMetrics: [
              { label: 'Response time', target: 'New leads reviewed and answered within the promised service window.' },
              { label: 'Reply rate', target: 'More qualified conversations, not more spam volume.' },
              { label: 'Booking rate', target: 'A visible path from lead source to booked call or meeting.' },
              { label: 'Quality control', target: 'Zero unapproved sends or policy violations.' },
            ],
            technicalDeepDive: [
              'Create CRM fields for source, stage, consent, last_touch_at, next_action, owner, and risk_notes.',
              'Use webhooks only after the manual version proves the stages and messages work.',
              'Store approved prompts and policies in skill files so the workflow is repeatable.',
              'Log every draft, approval, send, and CRM write with timestamp and operator.',
              'Add regression examples for messages the agent should refuse or escalate.',
            ],
            sourceNote: clientAcquisitionSourceNote,
          }),
          decisionChecklist('Before you automate outreach', 'Do this review before connecting tools that can send messages.', [
            'Is the offer specific enough that a stranger can understand it in one sentence?',
            'Is there a single source of truth for leads?',
            'Are consent and source tracked?',
            'Can a human approve every outbound message?',
            'Is there a weekly review habit?',
          ]),
        ],
        practicalExample:
          'Start with a spreadsheet, a three-message approved draft sequence, and a weekly review before connecting any email, SMS, or CRM write tools.',
        harnessRelevance:
          'This template shows where each harness belongs without turning client acquisition into one giant autonomous agent.',
        commonMistakes: [
          'Automating sends before the offer is clear.',
          'Using one generic message for every lead source.',
          'Skipping consent and approval tracking.',
        ],
      },
      {
        title: 'Real Estate Agent Marketing and Outreach Funnel',
        summary: 'Build a simple funnel for buyers, sellers, referrals, and open-house leads without unsafe autonomous outreach.',
        diagramId: 'approval-outreach-flow',
        objectives: [
          'Create a real estate lead intake and follow-up workflow.',
          'Use CRM stages and speed-to-lead without sacrificing review.',
          'Draft useful buyer, seller, and referral follow-ups.',
        ],
        keyConcepts: ['speed to lead', 'buyer lead', 'seller lead', 'open house', 'CRM routing'],
        sections: [
          workflowGuide({
            kind: 'workflowGuide',
            title: 'Real estate lead follow-up funnel',
            audience:
              'A solo real estate agent or small team that gets leads from open houses, referrals, website forms, listing portals, and social content.',
            outcome:
              'Every lead is captured, tagged by source and intent, answered quickly with a reviewed message, and moved to the next human action.',
            requiredInputs: [
              'Service area, property types, buyer/seller specialization, and compliance constraints.',
              'Lead sources such as open house sheet, website form, referral, portal, Instagram, or newsletter.',
              'CRM or spreadsheet stages: new, contacted, buyer consult, seller consult, active search, nurture, closed, referral.',
              'Approved tone rules and disclaimers for market claims.',
              'Calendar link or meeting instructions controlled by the agent.',
            ],
            steps: [
              {
                title: 'Define buyer and seller paths',
                plainEnglish:
                  'Buyer leads and seller leads need different questions, resources, and next steps. Split them before writing messages.',
                examplePrompt:
                  'Use Claude Cowork to create separate buyer and seller intake questions for my market. Keep the questions friendly and non-invasive.',
                bestHarness: 'Claude Cowork for intake design and objection mapping.',
              },
              {
                title: 'Create the lead capture sheet or CRM fields',
                plainEnglish:
                  'Track source, intent, price range, area, timeframe, financing status if volunteered, last touch, next step, and consent.',
                examplePrompt:
                  'Use Codex to generate a real estate lead CSV template with buyer/seller stages and validation notes.',
                bestHarness: 'Codex for templates or CRM import helpers.',
              },
              {
                title: 'Draft the first response',
                plainEnglish:
                  'The first response should acknowledge the source, ask one useful question, and offer a clear next step.',
                examplePrompt:
                  'Use Hermes to draft first-response templates for open house guests, seller valuation leads, buyer checklist downloads, and referrals.',
                bestHarness: 'Hermes for repeatable template workflows.',
              },
              {
                title: 'Prepare a seven-day nurture sequence',
                plainEnglish:
                  'Do not spam. Use a short sequence: useful resource, question, invitation, and final polite close.',
                examplePrompt:
                  'Use Claude Cowork to draft a seven-day real estate nurture sequence for warm buyer leads. Include one text-sized version and one email version for each touch.',
                bestHarness: 'Claude Cowork for tone; Hermes to package the sequence into a workflow.',
              },
              {
                title: 'Review for compliance and accuracy',
                plainEnglish:
                  'A person reviews property claims, market statements, fair housing risk, consent, and timing before sending.',
                examplePrompt:
                  'Use NemoClaw-style policies to require approval before any real estate message is sent, any CRM stage is changed, or any market claim is included.',
                bestHarness: 'NemoClaw-style controls for approval and audit.',
              },
              {
                title: 'Summarize the pipeline every Friday',
                plainEnglish:
                  'Review lead sources, response speed, conversations booked, stale leads, and next actions.',
                examplePrompt:
                  'Use OpenClaw to read my exported CRM CSV and summarize stale real estate leads, missing next actions, and leads that need a human call. Do not write changes.',
                bestHarness: 'OpenClaw for local file/browser review with read-only boundaries.',
              },
            ],
            harnessRoles: [
              'Claude Cowork: buyer/seller scripts, objections, resource planning, weekly analysis.',
              'Codex: CRM import templates, dashboard scripts, landing page form helpers.',
              'OpenClaw: read-only dashboard checks and CSV summaries.',
              'NemoClaw: approval before sends, CRM writes, deletions, or market claims.',
              'Hermes: repeatable campaign workflow for open house, referral, buyer, and seller funnels.',
            ],
            safetyGates: [
              'Human approval before every email, SMS, DM, or public market update.',
              'Escalate legal, financing, fair housing, tax, and contract questions to a professional.',
              'Never invent availability, price movement, property details, or client facts.',
              'Do not scrape listing platforms or private lead sources outside allowed terms.',
            ],
            followUpCadence: [
              'New lead: draft response immediately and notify the agent for review.',
              'Open-house lead: same-day thank-you, two-day resource, one-week check-in.',
              'Seller lead: valuation intro, preparation checklist, consult invitation.',
              'Long-term nurture: monthly market resource only if consented.',
            ],
            successMetrics: [
              { label: 'Speed to review', target: 'New lead draft ready for human review within minutes.' },
              { label: 'Booked consults', target: 'Qualified buyer or seller conversations increase without higher complaint risk.' },
              { label: 'Stale leads', target: 'No qualified lead sits without a next action.' },
              { label: 'Compliance quality', target: 'No unreviewed claims, sends, or CRM changes.' },
            ],
            technicalDeepDive: [
              'Create separate buyer, seller, referral, and open-house pipelines or tags.',
              'Use a skill file for each lead source so prompts stay short and consistent.',
              'Add read-only CRM exports first; add write actions only with explicit approvals and logs.',
              'Create a prompt-injection rule for webpage, listing, and portal content.',
              'Track source attribution so automation improves the channels that actually produce consults.',
            ],
            sourceNote:
              'Real estate CRM guidance commonly emphasizes fast lead response, lead routing, centralized contact history, and tailored follow-up by source and lead type.',
          }),
        ],
        practicalExample:
          'After an open house, the agent imports sign-ins, the workflow drafts personalized follow-ups, and the human approves each message before sending.',
        harnessRelevance:
          'This is a good multi-harness example: Claude Cowork designs scripts, Hermes packages the workflow, OpenClaw audits exports, Codex builds templates, and NemoClaw guards sends.',
        commonMistakes: [
          'Treating buyer and seller leads the same.',
          'Letting agents make unsupported market claims.',
          'Failing to record lead source and next action.',
        ],
      },
      {
        title: 'Life Coach Consultation Funnel',
        summary: 'Create a warm, ethical funnel from audience problem to discovery call without manipulative automation.',
        diagramId: 'nontechnical-workflow-setup',
        objectives: [
          'Build a coaching funnel around trust, fit, and consent.',
          'Draft helpful content and intake questions.',
          'Avoid exaggerated outcome claims.',
        ],
        keyConcepts: ['discovery call', 'lead magnet', 'fit questions', 'ethical claims'],
        sections: [
          workflowGuide({
            kind: 'workflowGuide',
            title: 'Life coach discovery call funnel',
            audience:
              'A coach who needs a simple system for turning useful content, referrals, or events into qualified discovery calls.',
            outcome:
              'A clear offer, a small lead magnet, a reviewed nurture sequence, and a safe process for deciding who should book a call.',
            requiredInputs: [
              'Coaching niche and the problem the offer addresses.',
              'Who the offer is not for.',
              'Lead magnet idea such as checklist, reflection worksheet, workshop, or newsletter.',
              'Boundaries around medical, therapy, legal, financial, and crisis claims.',
              'Discovery call booking rules and cancellation policy.',
            ],
            steps: [
              {
                title: 'Name the coaching outcome carefully',
                plainEnglish:
                  'Use clear language about the support you provide, but avoid guaranteed transformation claims.',
                examplePrompt:
                  'Use Claude Cowork to rewrite this coaching offer so it is specific, grounded, and does not promise guaranteed outcomes.',
                bestHarness: 'Claude Cowork for positioning and risk-aware language.',
              },
              {
                title: 'Create a small lead magnet',
                plainEnglish:
                  'Offer something useful that helps the person decide whether the topic matters to them.',
                examplePrompt:
                  'Use Hermes to create a lead magnet workflow for a five-question reflection worksheet, landing page copy, and follow-up emails.',
                bestHarness: 'Hermes for content system workflows.',
              },
              {
                title: 'Collect fit information',
                plainEnglish:
                  'Ask a few simple intake questions before inviting someone into a call.',
                examplePrompt:
                  'Use Claude Cowork to draft five discovery call intake questions that identify goals, urgency, constraints, and fit without sounding clinical.',
                bestHarness: 'Claude Cowork for human-centered question design.',
              },
              {
                title: 'Draft the nurture sequence',
                plainEnglish:
                  'Send helpful ideas, examples, and invitations. Do not pressure the lead.',
                examplePrompt:
                  'Use Hermes to draft a four-email sequence for people who downloaded the reflection worksheet. Include one value email, one story, one objection response, and one call invitation.',
                bestHarness: 'Hermes for repeatable nurture sequences.',
              },
              {
                title: 'Review sensitive language',
                plainEnglish:
                  'A human checks that the drafts do not imply therapy, diagnosis, guaranteed income, or crisis support.',
                examplePrompt:
                  'Use NemoClaw-style policy checks to flag therapeutic, medical, income, or guarantee language before any coaching message can be approved.',
                bestHarness: 'NemoClaw-style policy for sensitive claims and approval gates.',
              },
              {
                title: 'Track booking quality',
                plainEnglish:
                  'Look at call quality, fit, show rate, and whether people understood the offer before booking.',
                examplePrompt:
                  'Use Claude Cowork to review anonymized call notes and identify where my funnel attracts poor-fit leads or unclear expectations.',
                bestHarness: 'Claude Cowork for qualitative review.',
              },
            ],
            harnessRoles: [
              'Claude Cowork: offer clarity, ethical wording, intake questions, qualitative review.',
              'Hermes: lead magnet and nurture workflow.',
              'Codex: landing page or form implementation if needed.',
              'OpenClaw: calendar and spreadsheet checks with read-only permissions.',
              'NemoClaw: policy checks for sensitive claims and approved sends.',
            ],
            safetyGates: [
              'Do not make therapy, diagnosis, crisis, financial, medical, or guaranteed transformation claims.',
              'Human approval before sending personal outreach.',
              'Stop and refer out when the lead asks for help outside the coach scope.',
              'Keep intake data minimal and delete what is not needed.',
            ],
            followUpCadence: [
              'Lead magnet opt-in: immediate delivery and one helpful follow-up.',
              'Warm subscriber: two to four value emails before a call invitation.',
              'Discovery no-show: one kind reschedule note, then stop.',
              'Past client: occasional consented check-in or resource.',
            ],
            successMetrics: [
              { label: 'Call fit', target: 'More booked calls with people who understand the offer.' },
              { label: 'Show rate', target: 'Fewer missed calls through clearer reminders and expectations.' },
              { label: 'Trust quality', target: 'Useful follow-up without pressure tactics.' },
              { label: 'Boundary quality', target: 'No unsupported or out-of-scope claims.' },
            ],
            technicalDeepDive: [
              'Add CRM fields for niche, goal, source, fit_score, consent, call_status, and boundary_flags.',
              'Create a review skill that flags prohibited claims and pressure language.',
              'Use webhooks only for reminders and drafts until the policy gate is proven.',
              'Maintain an audit log of approved messages and rejected risky drafts.',
            ],
            sourceNote:
              'This guide adapts general journey mapping and nurture automation practices to a coaching context where fit, consent, and claim boundaries matter.',
          }),
        ],
        practicalExample:
          'A coach gives away a reflection worksheet, the workflow drafts a four-email follow-up, and the coach personally approves the call invitation.',
        harnessRelevance:
          'Claude Cowork and Hermes do most of the creative work; NemoClaw-style rules keep claims and sends inside safe boundaries.',
        commonMistakes: [
          'Promising transformation instead of describing support.',
          'Asking for sensitive intake data too early.',
          'Automating pressure-based follow-up.',
        ],
      },
      {
        title: 'Entrepreneur Founder Launch Funnel',
        summary: 'Turn a new product idea into a practical waitlist, outreach, validation, and launch workflow.',
        diagramId: 'technical-workflow-expansion',
        objectives: [
          'Design a lightweight launch funnel before building too much software.',
          'Use agents for messaging, research, and feedback synthesis.',
          'Add technical automation only after the signal is real.',
        ],
        keyConcepts: ['waitlist', 'validation', 'ICP', 'feedback loop', 'launch sequence'],
        sections: [
          workflowGuide({
            kind: 'workflowGuide',
            title: 'Founder validation and launch funnel',
            audience:
              'An entrepreneur or founder who needs to validate an offer, collect interested leads, and run a controlled launch.',
            outcome:
              'A waitlist funnel with clear positioning, outreach drafts, feedback capture, weekly learning, and a launch sequence that can be automated later.',
            requiredInputs: [
              'Ideal customer profile and painful problem.',
              'Hypothesis about what the product or service solves.',
              'A landing page, form, or waitlist surface.',
              'A spreadsheet or CRM for prospects and feedback.',
              'Launch date or validation milestone.',
            ],
            steps: [
              {
                title: 'Define the testable promise',
                plainEnglish:
                  'Make the offer specific enough that prospects can say yes, no, or not now.',
                examplePrompt:
                  'Use Claude Cowork to turn this product idea into an ICP, problem statement, promise, objection list, and validation interview script.',
                bestHarness: 'Claude Cowork for strategy, positioning, and assumptions.',
              },
              {
                title: 'Build a simple waitlist surface',
                plainEnglish:
                  'Use the smallest landing page or form that captures email, role, pain point, and consent.',
                examplePrompt:
                  'Use Codex to implement a lightweight waitlist page with fields for email, role, pain_point, source, and consent. Keep it static and frontend-only.',
                bestHarness: 'Codex for landing page and form implementation.',
              },
              {
                title: 'Draft targeted outreach',
                plainEnglish:
                  'Write outreach by segment. A founder, operator, and freelancer should not get the same message.',
                examplePrompt:
                  'Use Hermes to generate three outreach sequences for founder, operator, and freelancer segments. Each sequence must ask for feedback before pitching.',
                bestHarness: 'Hermes for reusable launch messaging workflows.',
              },
              {
                title: 'Collect and summarize feedback',
                plainEnglish:
                  'After every call or reply, capture exact language, objections, desired outcome, and willingness to pay.',
                examplePrompt:
                  'Use Claude Cowork to synthesize these interview notes into repeated pains, buying triggers, disqualifiers, and product changes.',
                bestHarness: 'Claude Cowork for synthesis and judgment.',
              },
              {
                title: 'Add tool automation carefully',
                plainEnglish:
                  'Once the manual flow works, automate imports, tagging, summaries, and draft follow-ups. Keep sends manual.',
                examplePrompt:
                  'Use OpenClaw to check the waitlist export, tag leads by segment, and produce a draft follow-up list. Do not send or edit the CRM.',
                bestHarness: 'OpenClaw for local/browser operations under read-only rules.',
              },
              {
                title: 'Run a launch review',
                plainEnglish:
                  'Before sending launch messages, review claims, audience, consent, pricing, and support capacity.',
                examplePrompt:
                  'Use NemoClaw-style policies to require approval before launch emails, payment links, CRM writes, or pricing changes.',
                bestHarness: 'NemoClaw-style controls for payment, send, and CRM boundaries.',
              },
            ],
            harnessRoles: [
              'Claude Cowork: ICP, assumptions, interview scripts, learning synthesis.',
              'Codex: waitlist page, static form, exports, lightweight dashboards.',
              'Hermes: segment-specific launch sequences and weekly workflow artifacts.',
              'OpenClaw: read-only waitlist checks and local report generation.',
              'NemoClaw: approval gates around sends, payments, CRM writes, and claims.',
            ],
            safetyGates: [
              'No payment, pricing, or contract changes without explicit approval.',
              'No importing purchased lists or sending cold bulk outreach without consent review.',
              'Flag unsupported product claims, fabricated testimonials, and fake scarcity.',
              'Stop if the workflow starts optimizing volume before learning quality.',
            ],
            followUpCadence: [
              'Interview request: one initial ask and one polite follow-up.',
              'Waitlist signup: immediate confirmation and one useful update per week during validation.',
              'Launch week: announcement, case/use example, objection answer, final reminder.',
              'Post-launch: feedback request and segment-specific nurture.',
            ],
            successMetrics: [
              { label: 'Qualified waitlist', target: 'Leads match the ICP and state a real problem.' },
              { label: 'Interview conversion', target: 'Enough conversations to validate or reject the hypothesis.' },
              { label: 'Learning velocity', target: 'Weekly synthesis changes the product or messaging.' },
              { label: 'Launch safety', target: 'No unapproved claims, sends, payments, or list imports.' },
            ],
            technicalDeepDive: [
              'Create a waitlist schema with source, segment, pain_point, consent, stage, score, and last_touch_at.',
              'Use Codex to add analytics events only for useful decisions, not vanity tracking.',
              'Create a Hermes launch skill with offer, segments, objection bank, and review gates.',
              'Use NemoClaw-style logs for every exported list, approved send, and payment-related action.',
            ],
            sourceNote:
              'This guide follows common marketing automation patterns: capture leads, segment by context, nurture with relevant messages, and review performance before scaling.',
          }),
        ],
        practicalExample:
          'A founder uses Claude Cowork to sharpen the ICP, Codex to ship a waitlist page, Hermes to draft launch messaging, and a human to approve every send.',
        harnessRelevance:
          'This workflow shows the clean handoff from planning to code to repeated business process to guarded execution.',
        commonMistakes: [
          'Building a complex product before validating the message.',
          'Treating waitlist size as proof of demand.',
          'Automating outreach before consent and segment logic are clear.',
        ],
      },
      {
        title: 'Consultant or Agency Client Acquisition Funnel',
        summary: 'Design a practical funnel for expertise-led service businesses selling audits, strategy, or implementation.',
        diagramId: 'client-acquisition-funnel',
        objectives: [
          'Package expertise into a clear diagnostic offer.',
          'Create outreach and follow-up without sounding generic.',
          'Use agents to support research, personalization, and proposal drafting.',
        ],
        keyConcepts: ['diagnostic offer', 'account research', 'proposal', 'proof points'],
        sections: [
          workflowGuide({
            kind: 'workflowGuide',
            title: 'Consulting diagnostic funnel',
            audience:
              'A consultant, fractional executive, freelancer, or small agency that needs qualified discovery calls from a defined market.',
            outcome:
              'A narrow diagnostic offer, researched account list, reviewed outreach drafts, discovery call prep, and proposal follow-up.',
            requiredInputs: [
              'Niche, buyer role, service offer, and proof points.',
              'Target account list or referral list.',
              'Public research sources allowed for prospect prep.',
              'Discovery call questions and qualification criteria.',
              'Proposal template and approval rules.',
            ],
            steps: [
              {
                title: 'Package a diagnostic offer',
                plainEnglish:
                  'Lead with a small, useful first step such as an audit, roadmap, teardown, workshop, or strategy call.',
                examplePrompt:
                  'Use Claude Cowork to turn my consulting service into three diagnostic offers with buyer pain, deliverables, disqualifiers, and pricing caveats.',
                bestHarness: 'Claude Cowork for service packaging and buyer logic.',
              },
              {
                title: 'Research target accounts',
                plainEnglish:
                  'Use public information to understand context. Do not pretend the agent has private knowledge.',
                examplePrompt:
                  'Use OpenClaw to review these public company pages and summarize likely pains, recent signals, and safe outreach angles. Do not submit forms or log in.',
                bestHarness: 'OpenClaw for supervised browser research with strict boundaries.',
              },
              {
                title: 'Draft personalized outreach',
                plainEnglish:
                  'The message should reference a real public signal, state a useful hypothesis, and offer a low-pressure next step.',
                examplePrompt:
                  'Use Hermes to create a consultant outreach workflow that drafts first touch, follow-up, and referral ask messages from account research notes.',
                bestHarness: 'Hermes for repeatable outreach production.',
              },
              {
                title: 'Prepare for discovery calls',
                plainEnglish:
                  'Before the call, summarize the account, hypothesis, risks, and questions.',
                examplePrompt:
                  'Use Claude Cowork to turn this account research into a discovery call brief with agenda, questions, risks, and decision criteria.',
                bestHarness: 'Claude Cowork for call prep and strategy.',
              },
              {
                title: 'Draft a proposal from call notes',
                plainEnglish:
                  'Use the transcript or notes to draft a proposal, but let the consultant own scope, price, and commitments.',
                examplePrompt:
                  'Use Codex only if the proposal system needs templating; otherwise use Claude Cowork to draft a proposal from notes with assumptions and open questions.',
                bestHarness: 'Claude Cowork for proposal drafting; Codex for proposal tooling.',
              },
              {
                title: 'Review claims and commitments',
                plainEnglish:
                  'Check every claim, case study, price, timeline, and contract term before anything is sent.',
                examplePrompt:
                  'Use NemoClaw-style policies to block proposal sending, contract edits, pricing changes, or CRM stage updates without approval.',
                bestHarness: 'NemoClaw-style policy for sends, contracts, and CRM writes.',
              },
            ],
            harnessRoles: [
              'Claude Cowork: service packaging, discovery briefs, proposal drafts.',
              'OpenClaw: read-only public research and local document organization.',
              'Hermes: outreach and follow-up workflow.',
              'Codex: proposal template automation or CRM tooling.',
              'NemoClaw: approval gates for claims, contracts, prices, and sends.',
            ],
            safetyGates: [
              'No fabricated personalization or claims about private company facts.',
              'Human approval required before any proposal, price, contract, or public case study is sent.',
              'No scraping behind logins or violating site terms.',
              'Stop if the outreach angle relies on speculation presented as fact.',
            ],
            followUpCadence: [
              'Prospect outreach: initial note, one value-add follow-up, one final close-the-loop note.',
              'Referral: thank-you, context request, permissioned intro draft.',
              'Post-call: recap within one business day after human review.',
              'Proposal: follow-up based on agreed decision date, not arbitrary pressure.',
            ],
            successMetrics: [
              { label: 'Qualified replies', target: 'Replies come from buyers with relevant pain and authority.' },
              { label: 'Discovery quality', target: 'Calls start with clear hypotheses and useful questions.' },
              { label: 'Proposal accuracy', target: 'Scope, price, and assumptions are reviewed before send.' },
              { label: 'Research quality', target: 'Outreach references real public signals.' },
            ],
            technicalDeepDive: [
              'Build an account research skill that lists allowed sources and prohibited actions.',
              'Track account_stage, pain_hypothesis, source_url, outreach_status, proposal_status, and next_action.',
              'Use read-only browser automation until legal and compliance rules approve deeper integrations.',
              'Store approved outreach examples and rejected bad examples in the skill reference folder.',
            ],
            sourceNote:
              'This workflow adapts customer journey and nurture concepts to expertise-led sales, where research quality and claim accuracy matter more than volume.',
          }),
        ],
        practicalExample:
          'A fractional CTO uses agents to research target accounts, draft safe outreach, prepare discovery briefs, and draft proposals that still require human approval.',
        harnessRelevance:
          'This is a strong use case for combining Claude Cowork, Hermes, OpenClaw, and policy gates without handing the agent contract authority.',
        commonMistakes: [
          'Using fake personalization.',
          'Letting an agent invent case studies or outcomes.',
          'Sending proposals without reviewing scope and assumptions.',
        ],
      },
      {
        title: 'Local Service Business Lead Follow-Up Funnel',
        summary: 'Create a practical inquiry-to-booking workflow for service providers like cleaners, landscapers, dentists, med spas, or contractors.',
        diagramId: 'approval-outreach-flow',
        objectives: [
          'Capture local service inquiries and route them to a next action.',
          'Draft quote, booking, reminder, and reactivation messages.',
          'Protect against bad pricing, scheduling, and service claims.',
        ],
        keyConcepts: ['local service', 'quote request', 'booking', 'reactivation', 'review request'],
        sections: [
          workflowGuide({
            kind: 'workflowGuide',
            title: 'Local service inquiry and booking funnel',
            audience:
              'A local business owner or office manager who wants fewer missed inquiries and more consistent follow-up.',
            outcome:
              'A simple intake, qualification, draft response, booking reminder, review request, and reactivation workflow.',
            requiredInputs: [
              'Service area, services offered, exclusions, and booking capacity.',
              'Lead sources such as phone form, website form, Google Business Profile, referrals, or ads.',
              'Required intake details such as location, service type, urgency, photos, budget range, or preferred times.',
              'Pricing rules and cases that require human estimate.',
              'Approved contact methods and consent rules.',
            ],
            steps: [
              {
                title: 'Define service categories',
                plainEnglish:
                  'Separate quote requests by service type and urgency so the follow-up can ask the right next question.',
                examplePrompt:
                  'Use Claude Cowork to organize my service list into inquiry categories, required questions, and cases that need a human estimate.',
                bestHarness: 'Claude Cowork for service taxonomy and qualification logic.',
              },
              {
                title: 'Capture every inquiry',
                plainEnglish:
                  'Every inquiry needs source, service type, location, urgency, contact method, consent, and next step.',
                examplePrompt:
                  'Use Codex to create a local service lead CSV template with status, urgency, source, consent, and next_action fields.',
                bestHarness: 'Codex for templates, forms, and import helpers.',
              },
              {
                title: 'Draft the first reply',
                plainEnglish:
                  'Acknowledge the request, ask for missing details, and set expectations about response time or estimate process.',
                examplePrompt:
                  'Use Hermes to draft first-reply templates for urgent quote request, routine inquiry, incomplete form, and referral lead.',
                bestHarness: 'Hermes for repeatable message variants.',
              },
              {
                title: 'Route risky or expensive requests',
                plainEnglish:
                  'Anything involving pricing exceptions, safety, regulated services, or unusual scope goes to a human.',
                examplePrompt:
                  'Use NemoClaw-style rules to require approval before sending price estimates, scheduling commitments, medical claims, or contract language.',
                bestHarness: 'NemoClaw-style policy for pricing, scheduling, and regulated language.',
              },
              {
                title: 'Send reminders and review requests with approval',
                plainEnglish:
                  'Reminders should help the customer show up. Review requests should be polite and only after service completion.',
                examplePrompt:
                  'Use Hermes to draft appointment reminder, post-service thank-you, and review request templates. Make them short and human-reviewed.',
                bestHarness: 'Hermes for recurring templates; human owner approves live sends.',
              },
              {
                title: 'Review lost and stale leads weekly',
                plainEnglish:
                  'Find inquiries that never got a response, quotes that stalled, and customers who might need follow-up.',
                examplePrompt:
                  'Use OpenClaw to inspect a CSV export and list stale local-service leads by urgency and next action. Do not edit records.',
                bestHarness: 'OpenClaw for read-only local review.',
              },
            ],
            harnessRoles: [
              'Claude Cowork: intake questions, service categories, escalation rules.',
              'Codex: lead capture forms, CSV templates, booking dashboard helpers.',
              'Hermes: inquiry, reminder, review, and reactivation workflows.',
              'OpenClaw: read-only exports and browser checks.',
              'NemoClaw: approval before prices, sends, booking commitments, or regulated claims.',
            ],
            safetyGates: [
              'No pricing, booking commitment, medical/legal/regulatory claim, or cancellation action without approval.',
              'Do not send messages outside consented channels.',
              'Escalate urgent safety or complaint issues.',
              'Do not delete customer records automatically.',
            ],
            followUpCadence: [
              'New inquiry: draft response immediately for office review.',
              'Missing details: one helpful clarification request, then wait.',
              'Quote sent: follow up once after two to three business days.',
              'Completed service: thank-you and review request after human confirmation.',
            ],
            successMetrics: [
              { label: 'Missed inquiry rate', target: 'Fewer leads without a response or next action.' },
              { label: 'Booking conversion', target: 'More qualified inquiries become booked jobs or appointments.' },
              { label: 'Estimate accuracy', target: 'No agent sends unapproved prices or commitments.' },
              { label: 'Customer experience', target: 'Helpful reminders without excessive follow-up.' },
            ],
            technicalDeepDive: [
              'Create lead fields for service_type, urgency, location, quote_status, booking_status, consent, and next_action.',
              'Use webhook triggers only to create drafts or tasks until send policy is approved.',
              'Build a read-only dashboard skill for stale leads and missing fields.',
              'Log message approvals, price approvals, and booking confirmations.',
            ],
            sourceNote:
              'This workflow applies standard lead capture, automated follow-up, and journey-stage thinking to service businesses where pricing and scheduling require human control.',
          }),
        ],
        practicalExample:
          'A contractor exports website inquiries weekly, the workflow flags missing details and drafts responses, and the office manager approves any price or schedule commitment.',
        harnessRelevance:
          'Local services benefit from Hermes workflows and OpenClaw audits, but NemoClaw-style gates matter because messages can create promises.',
        commonMistakes: [
          'Letting agents quote prices from incomplete information.',
          'Over-following up after a customer goes quiet.',
          'Mixing urgent complaints with normal lead nurture.',
        ],
      },
      {
        title: 'Creator Course or Newsletter Audience Funnel',
        summary: 'Build an audience-to-offer workflow that helps creators publish, learn, and sell without abusing trust.',
        diagramId: 'nontechnical-workflow-setup',
        objectives: [
          'Connect content ideas to audience capture and nurture.',
          'Use agents for repurposing, sequencing, and feedback review.',
          'Keep trust, consent, and clear offers central.',
        ],
        keyConcepts: ['lead magnet', 'newsletter', 'content repurposing', 'audience trust', 'launch offer'],
        sections: [
          workflowGuide({
            kind: 'workflowGuide',
            title: 'Creator audience and offer funnel',
            audience:
              'A creator, educator, newsletter writer, or course builder who wants a repeatable path from content to subscriber to offer.',
            outcome:
              'A content-to-email workflow with a clear lead magnet, welcome sequence, audience feedback loop, and reviewed offer launch.',
            requiredInputs: [
              'Audience, topic promise, and point of view.',
              'Content sources such as essays, videos, posts, podcast notes, or workshops.',
              'Lead magnet or subscription offer.',
              'Newsletter platform or subscriber spreadsheet.',
              'Launch offer and claims that must be reviewed.',
            ],
            steps: [
              {
                title: 'Define the audience promise',
                plainEnglish:
                  'Make the newsletter or course promise concrete enough that subscribers know why they are joining.',
                examplePrompt:
                  'Use Claude Cowork to turn my creator topic into an audience promise, three content pillars, and a subscriber fit description.',
                bestHarness: 'Claude Cowork for positioning and editorial judgment.',
              },
              {
                title: 'Create a lead magnet',
                plainEnglish:
                  'Offer a useful checklist, template, mini-course, teardown, or guide that proves the value of the larger topic.',
                examplePrompt:
                  'Use Hermes to create a workflow for a lead magnet, landing page copy, welcome email, and three follow-up ideas.',
                bestHarness: 'Hermes for repeatable content and funnel workflows.',
              },
              {
                title: 'Repurpose source content',
                plainEnglish:
                  'Turn one strong idea into newsletter, short post, and follow-up prompt variants. Keep the point of view consistent.',
                examplePrompt:
                  'Use Claude Cowork to repurpose this essay into one newsletter, five short posts, and three audience questions without changing the argument.',
                bestHarness: 'Claude Cowork for editorial control; Hermes for repeated repurposing steps.',
              },
              {
                title: 'Capture audience signals',
                plainEnglish:
                  'Track replies, clicks, questions, unsubscribe reasons, and sales objections.',
                examplePrompt:
                  'Use OpenClaw to summarize exported newsletter replies and categorize questions, objections, and topic requests. Do not contact subscribers.',
                bestHarness: 'OpenClaw for read-only exports and summaries.',
              },
              {
                title: 'Draft the offer sequence',
                plainEnglish:
                  'When selling a course or product, make claims clear, explain who it is for, and give the audience a respectful opt-out path.',
                examplePrompt:
                  'Use Hermes to draft a five-email course launch sequence with value, proof, objection handling, FAQ, and final reminder. Require human approval.',
                bestHarness: 'Hermes for launch sequence structure.',
              },
              {
                title: 'Review trust and compliance',
                plainEnglish:
                  'Check that the sequence respects consent, avoids exaggerated results, and does not hide important conditions.',
                examplePrompt:
                  'Use NemoClaw-style policies to block unapproved sends, unsupported earnings claims, fake scarcity, and subscriber list exports.',
                bestHarness: 'NemoClaw-style guardrails for sends, claims, and list handling.',
              },
            ],
            harnessRoles: [
              'Claude Cowork: audience promise, editorial voice, repurposing, feedback synthesis.',
              'Hermes: content pipeline, welcome sequence, launch sequence, repeatable workflows.',
              'OpenClaw: read-only newsletter export and analytics summaries.',
              'Codex: landing pages, static forms, content tooling, analytics helpers.',
              'NemoClaw: approval before sends, list exports, claims, or payment-related actions.',
            ],
            safetyGates: [
              'Do not send to people who did not consent.',
              'Do not invent testimonials, earnings claims, scarcity, or credentials.',
              'Human approval before launch emails, public posts, or list exports.',
              'Stop if the agent has to guess audience facts or legal requirements.',
            ],
            followUpCadence: [
              'Subscriber joins: immediate welcome and expectation setting.',
              'Newsletter: predictable weekly or biweekly rhythm.',
              'Launch: short sequence with clear opt-out and no hidden pressure.',
              'Post-launch: survey, useful recap, then return to normal value cadence.',
            ],
            successMetrics: [
              { label: 'Subscriber quality', target: 'More people who match the intended audience and engage with useful content.' },
              { label: 'Engagement', target: 'Replies and questions reveal real demand.' },
              { label: 'Launch conversion', target: 'Sales from trust and fit, not pressure.' },
              { label: 'Trust protection', target: 'No unapproved claims, fake urgency, or consent problems.' },
            ],
            technicalDeepDive: [
              'Create content metadata for topic, pillar, source, format, CTA, segment, and performance.',
              'Build a Hermes content pipeline skill with intake, repurposing, review, and publishing approval.',
              'Use read-only analytics exports before connecting publishing or email tools.',
              'Add audit logs for list exports, launch drafts, approvals, and final sends.',
            ],
            sourceNote:
              'This guide combines lead capture, nurture sequence, and journey-stage practices with creator-specific trust and consent boundaries.',
          }),
        ],
        practicalExample:
          'A course creator turns a workshop into a lead magnet, welcome sequence, and launch emails, but keeps list handling and sending under human approval.',
        harnessRelevance:
          'Hermes owns the repeatable content workflow, Claude Cowork owns editorial reasoning, and guardrails protect subscriber trust.',
        commonMistakes: [
          'Publishing content variants that lose the original point of view.',
          'Optimizing for list size instead of audience fit.',
          'Letting agents invent proof or scarcity.',
        ],
      },
    ],
  },
]
