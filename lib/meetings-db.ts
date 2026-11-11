
import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-11-01",
    meetingType: "testimony",
    presiding: "Bishop James Carter",
    conducting: "Bishop James Carter",
    announcements: ["Ward service activity on Saturday."],
    openingHymn: { number: 3, title: "Now Let Us Rejoice" },
    openingPrayer: "Sarah Miller",
    wardBusiness: [{ description: "Welcome new ward members." }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: "Ward Members", topic: "Testimonies", type: "speaker" }
    ],
    closingHymn: { number: 152, title: "God Be with You Till We Meet Again" },
    closingPrayer: "Michael Davis"
  },
  {
    id: 2,
    date: "2026-11-08",
    meetingType: "regular",
    presiding: "Bishop James Carter",
    conducting: "Brother Daniel Reed",
    announcements: ["Youth activity Wednesday at 7 PM."],
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Emily Wilson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 170, title: "God, Our Father, Hear Us Pray" },
    speakers: [
      { name: "John Peterson", topic: "Faith", type: "speaker" },
      { name: "Mary Thompson", topic: "Service", type: "speaker" }
    ],
    closingHymn: { number: 98, title: "I Need Thee Every Hour" },
    closingPrayer: "David Brown"
  },
  {
    id: 3,
    date: "2026-11-15",
    meetingType: "regular",
    presiding: "Bishop James Carter",
    conducting: "Brother Daniel Reed",
    announcements: ["Ward council meeting after church."],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Rebecca Johnson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [
      { name: "Robert Smith", topic: "Prayer", type: "speaker" },
      { name: "Ward Choir", topic: "Special Musical Number", type: "musical-number" }
    ],
    closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    closingPrayer: "Linda Anderson"
  },
  {
    id: 4,
    date: "2026-11-22",
    meetingType: "regular",
    presiding: "Bishop James Carter",
    conducting: "Bishop James Carter",
    announcements: ["Thanksgiving food drive."],
    openingHymn: { number: 94, title: "Come, Ye Thankful People" },
    openingPrayer: "Jennifer Lee",
    wardBusiness: [{ description: "Sustain new ward calling." }],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: "While of These Emblems We Partake" },
    speakers: [
      { name: "Thomas White", topic: "Gratitude", type: "speaker" },
      { name: "Anna Green", topic: "Family", type: "speaker" }
    ],
    closingHymn: { number: 241, title: "Count Your Blessings" },
    closingPrayer: "Peter Clark"
  },
  {
    id: 5,
    date: "2026-11-29",
    meetingType: "regular",
    presiding: "Bishop James Carter",
    conducting: "Brother Daniel Reed",
    announcements: ["Christmas program rehearsal next week."],
    openingHymn: { number: 209, title: "Hark! The Herald Angels Sing" },
    openingPrayer: "Nancy Adams",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: "O God, the Eternal Father" },
    speakers: [
      { name: "Steven Hall", topic: "Hope", type: "speaker" },
      { name: "Karen Young", topic: "Charity", type: "speaker" }
    ],
    closingHymn: { number: 204, title: "Silent Night" },
    closingPrayer: "Brian Lewis"
  }
];

export function getMeetings(): SacramentMeeting[] {
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

export function getMeetingByDate(date: string): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.date === date);
}
