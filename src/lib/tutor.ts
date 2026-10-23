export type Msg = { id: string; role: "user" | "assistant"; text: string };

const KB: { keys: string[]; answer: string }[] = [
  {
    keys: ["region pair", "paired region"],
    answer:
      "**Region Pairs** are like two M-Pesa head offices in different cities — say Nairobi and Mombasa. If floods knock out one, the other keeps your money safe.\n\nAzure pairs regions in the same geography, at least ~300 miles apart, so updates roll out one at a time and disaster recovery is prioritised.\n\n**Exam tip:** Region pairs ≠ Availability Zones. Zones are inside *one* region.",
  },
  {
    keys: ["availability zone", "zones"],
    answer:
      "**Availability Zones** are like three separate matatu depots in the same town, each with its own fuel, mechanics and power. If one depot floods, the other two keep routes running.\n\nEach zone is one or more datacenters with independent power, cooling and networking, inside a single Azure region.",
  },
  {
    keys: ["capex", "opex"],
    answer:
      "**CapEx vs OpEx**\n\n- **CapEx** = buying your own matatu outright. Big upfront cost, you own it, you fix it.\n- **OpEx** = paying per trip with a ride-hailing app. No big purchase — you pay for what you use.\n\nCloud moves you from CapEx to **OpEx**: pay-as-you-go, no datacenter to build.",
  },
  {
    keys: ["load balanc"],
    answer:
      "**Load Balancing** is the stage tout directing passengers to whichever matatu has space, so no single vehicle is overloaded while others sit empty.\n\nAzure Load Balancer spreads incoming traffic across healthy VMs, and stops sending to any that fail health checks.",
  },
  {
    keys: ["scal", "elastic"],
    answer:
      "**Scalability** is a boda boda delivery business growing its fleet: add riders when orders spike (scale *out*), or give one rider a bigger bike (scale *up*).\n\n**Elasticity** means doing that *automatically* — riders join at lunch rush and go home when orders drop. You only pay for active riders.",
  },
  {
    keys: ["high availab", "fault toler", "redundan"],
    answer:
      "**High availability** is like a bank with many agent branches — if one agent is closed, you walk to the next and still withdraw cash.\n\n**Fault tolerance** goes further: the system keeps working *with no interruption* even when a component fails, like a hospital generator kicking in the second KPLC power drops.",
  },
  {
    keys: ["vm", "virtual machine"],
    answer:
      "A **Virtual Machine** is renting a fully furnished stall in an open-air market. You choose the size, you arrange the goods (OS, apps), but the market owner handles the land and roof.\n\nVMs are **IaaS** — you manage the OS and above.",
  },
  {
    keys: ["blob", "storage"],
    answer:
      "**Blob Storage** is a giant godown (warehouse) where you can store any sacks — photos, videos, backups — without caring what's inside.\n\nAccess tiers: **Hot** (front of the godown, quick to grab, pricier), **Cool**, **Cold**, and **Archive** (back corner, cheap but takes hours to retrieve).",
  },
  {
    keys: ["vnet", "virtual network"],
    answer:
      "A **Virtual Network (VNet)** is a gated estate. Houses (VMs) inside can talk freely; the gate (NSGs, firewalls) controls who enters from outside. **Peering** is building a private road between two estates.",
  },
  {
    keys: ["rbac", "role", "iam", "identity", "entra"],
    answer:
      "**RBAC** is like a SACCO: the chairperson can approve loans, the treasurer can see accounts, members can only view their own savings. Everyone gets *just enough* access.\n\nIn Azure you assign a **role** (Owner, Contributor, Reader) to a **user/group** at a **scope** (subscription, resource group, resource). Identity is handled by **Microsoft Entra ID**.",
  },
  {
    keys: ["complian", "governance", "policy"],
    answer:
      "**Azure Policy** is the county by-laws — rules like \"all buildings must have fire exits\". It audits or blocks resources that break rules (e.g. only deploy in South Africa North).\n\n**Resource locks** are a padlock on the shop: CanNotDelete or ReadOnly.",
  },
  {
    keys: ["sla"],
    answer:
      "An **SLA** is like a power utility promising 99.9% uptime. If they miss it, you get credits on your bill.\n\nCombining services *multiplies* SLAs: two 99.9% services in series ≈ 99.8%. Adding redundancy across zones raises it.",
  },
  {
    keys: ["pric", "cost", "tco", "support", "billing"],
    answer:
      "**Cost Management** is your M-Pesa statement for the cloud — see exactly where every shilling went and set budget alerts.\n\n- **Pricing Calculator**: estimate before you buy.\n- **TCO Calculator**: compare on-prem vs Azure.\n- **Support plans**: Basic (free), Developer, Standard, Professional Direct.",
  },
  {
    keys: ["iaas", "paas", "saas", "shared responsib"],
    answer:
      "Think of food:\n\n- **On-prem** = cook at home, you do everything.\n- **IaaS** = rent a kitchen; you buy ingredients and cook.\n- **PaaS** = hire a caterer's kitchen with staff; you just give the recipe.\n- **SaaS** = eat at a nyama choma joint; you just pay and eat.\n\nThat's the **shared responsibility model** — the more \"as-a-service\", the less you manage.",
  },
];

const SHENG = [
  "Poa sana! 🇰🇪 Let's break down this cloud concept...",
  "Sawa sawa! Hii ni rahisi, check this out 👇",
  "Mambo! Uko kwa njia sahihi — let's go!",
];
const SHENG_END = ["\n\nUnaweza! You've got this 💪", "\n\nTuko pamoja — keep pushing! 🚀"];

export function getTutorReply(q: string, sheng: boolean): string {
  const l = q.toLowerCase();
  const hit = KB.find((k) => k.keys.some((key) => l.includes(key)));
  let body =
    hit?.answer ??
    "Great question! I don't have a ready-made analogy for that one yet. Try asking about **Region Pairs, Availability Zones, CapEx vs OpEx, Load Balancing, Scalability, VMs, Blob Storage, VNets, RBAC, Azure Policy, SLAs** or **pricing** — or tap a domain chip below.";
  if (sheng) {
    body =
      SHENG[Math.floor(Math.random() * SHENG.length)] +
      "\n\n" +
      body +
      SHENG_END[Math.floor(Math.random() * SHENG_END.length)];
  }
  return body;
}

export const DOMAINS = [
  { emoji: "🌩️", label: "Cloud Concepts", prompt: "Explain CapEx vs OpEx" },
  { emoji: "🏗️", label: "Core Azure Services", prompt: "What is a Region Pair?" },
  { emoji: "🔒", label: "Security & Governance", prompt: "Explain RBAC in Azure" },
  { emoji: "💰", label: "Pricing & Support", prompt: "How do SLAs work?" },
];

export const TIPS = [
  { title: "Zones vs Region Pairs", body: "Availability Zones are inside ONE region. Region Pairs are TWO regions in the same geography. Classic trap!" },
  { title: "Scale up vs scale out", body: "Up = bigger machine (vertical). Out = more machines (horizontal). Elasticity = automatic scaling." },
  { title: "Policy vs RBAC", body: "RBAC controls WHO can do things. Azure Policy controls WHAT resources are allowed. Don't mix them." },
  { title: "Composite SLAs go DOWN", body: "Chaining services multiplies SLAs, so overall uptime is lower than each individual one." },
  { title: "Archive tier latency", body: "Archive blobs must be rehydrated — this can take hours. Not for instant access." },
  { title: "Free support plan", body: "Basic support includes billing & subscription help only — no technical support engineers." },
  { title: "Resource locks beat Owners", body: "Even an Owner can't delete a resource with a CanNotDelete lock until the lock is removed." },
  { title: "Entra ID ≠ Active Directory", body: "Microsoft Entra ID is cloud identity. On-prem AD DS is different, though they can sync." },
];
