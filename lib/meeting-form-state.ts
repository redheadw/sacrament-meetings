export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingPrayer?: string[];
    closingPrayer?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    speakerName?: string[];
    speakerTopic?: string[];
    speakerType?: string[];
    announcements?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
  };
  message: string | null;
};

export const initialState: State = {
  message: null,
  errors: {},
};