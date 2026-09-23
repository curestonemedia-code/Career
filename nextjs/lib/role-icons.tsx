import {
  BriefcaseIcon,
  CameraIcon,
  ChartLineUpIcon,
  CodeIcon,
  HeadsetIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  PencilSimpleIcon,
  UsersThreeIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react/dist/ssr";

// A fixed, admin-selectable set of icons for job postings. Keeping this a
// closed registry (rather than a free-text icon name) means every role
// always has a valid icon, even for slugs nobody hardcoded ahead of time.
export const roleIconRegistry = {
  "video-camera": { label: "Video / Camera", Icon: VideoCameraIcon },
  "magnifying-glass": { label: "SEO / Research", Icon: MagnifyingGlassIcon },
  camera: { label: "Photography", Icon: CameraIcon },
  megaphone: { label: "Marketing", Icon: MegaphoneIcon },
  "pencil-simple": { label: "Writing / Design", Icon: PencilSimpleIcon },
  briefcase: { label: "General / Operations", Icon: BriefcaseIcon },
  "users-three": { label: "People / HR", Icon: UsersThreeIcon },
  "chart-line-up": { label: "Growth / Sales", Icon: ChartLineUpIcon },
  code: { label: "Engineering", Icon: CodeIcon },
  headset: { label: "Support", Icon: HeadsetIcon },
} as const;

export type RoleIconKey = keyof typeof roleIconRegistry;

export const roleIconKeys = Object.keys(roleIconRegistry) as RoleIconKey[];

export const DEFAULT_ROLE_ICON_KEY: RoleIconKey = "briefcase";

export function getRoleIcon(key: string | undefined) {
  if (key && key in roleIconRegistry) {
    return roleIconRegistry[key as RoleIconKey].Icon;
  }
  return roleIconRegistry[DEFAULT_ROLE_ICON_KEY].Icon;
}
