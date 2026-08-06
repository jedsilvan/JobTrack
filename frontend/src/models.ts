export const APPLICATION_STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
] 

export const ApplicationStatus = {
  Applied: "applied",
  Interview: "interview",
  Offer: "offer",
  Rejected: "rejected",
  
} as const;

export type ApplicationStatus = typeof ApplicationStatus[keyof typeof ApplicationStatus];

