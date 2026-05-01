import { GoodBadExample } from './GoodBadExample'

export function SoulFileExample({ fileName }: { fileName: string }) {
  return (
    <GoodBadExample
      title={`${fileName} comparison`}
      badTitle={`Weak ${fileName}`}
      bad="Be smart, be proactive, remember everything, and do whatever is needed."
      goodTitle={`Better ${fileName}`}
      good={`${fileName} states its purpose, scope, conflict rules, approval boundaries, and maintenance rules. It avoids secrets, temporary tasks, and unrelated project detail.`}
      takeaways={[
        'Durable files should be stable enough to survive many runs.',
        'Split identity, memory, policy, tools, and task instructions when they start to blur.',
        'Short explicit rules are easier for humans and agents to maintain.',
      ]}
    />
  )
}
