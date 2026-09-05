import type {NavLink} from "@chrishayuk/hause/components/NavShell";
export const SITE_NAV:NavLink[]=[
 {href:"/problems",label:"Why",group:"UNDERSTAND"},
 {href:"/knowledge",label:"Connected system",group:"UNDERSTAND",panelOnly:true},
 {href:"/in-practice",label:"Examples",group:"UNDERSTAND"},
 {href:"/ai-native-design-systems",label:"The category",group:"UNDERSTAND",panelOnly:true},
 {href:"/choosing",label:"Choose a form",group:"EXPLORE",panelOnly:true},
 {href:"/forms",label:"Forms",group:"EXPLORE"},
 {href:"/statements",label:"Read · statements",group:"EXPLORE",panelOnly:true},
 {href:"/instruments",label:"Operate · instruments",group:"EXPLORE",panelOnly:true},
 {href:"/performances",label:"Watch · performances",group:"EXPLORE",panelOnly:true},
 {href:"/publication",label:"Film & publication",group:"EXPLORE",panelOnly:true},
 {href:"/evidence",label:"Evidence",group:"EVIDENCE"},
 {href:"/how-hause-grew",label:"Origins & contributions",group:"EVIDENCE",panelOnly:true},
 ...["choosing-1","routing-1","routing-2","reading-1","reading-2"].map(slug=>({href:`/evals/${slug}`,label:slug.toUpperCase(),group:"EVIDENCE",panelOnly:true})),
 {href:"/ask",label:"Ask",group:"BUILD",accent:true,panelOnly:true},
 {href:"/use",label:"Build",group:"BUILD",boxed:true},
];
const primaryOrder=["/problems","/forms","/in-practice","/evidence","/use"];
SITE_NAV.sort((a,b)=>(a.panelOnly?99:primaryOrder.indexOf(a.href))-(b.panelOnly?99:primaryOrder.indexOf(b.href)));
export const FOOTER_GROUPS=[...new Set(SITE_NAV.map(n=>n.group!))].map(label=>({label,links:SITE_NAV.filter(n=>n.group===label).map(n=>({href:n.href,label:n.label}))}));
export const SITE_PATHS=["/",...SITE_NAV.map(n=>n.href)];
