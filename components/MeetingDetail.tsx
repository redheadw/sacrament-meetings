
import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00Z`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <article className="rounded-xl bg-white p-6 shadow-md print:rounded-none print:p-0 print:shadow-none">
      <div className="mb-6 border-b border-green-200 pb-4 text-center">
        <h2 className="text-3xl font-bold text-green-900">
          Sacrament Meeting
        </h2>
        <p className="mt-2 text-gray-700">
          Sample Ward
        </p>
        <p className="font-semibold">{formattedDate}</p>
        <p className="capitalize">
          {meeting.meetingType} Meeting
        </p>
      </div>

      <div className="space-y-4">
        <p><strong>Presiding:</strong> {meeting.presiding}</p>
        <p><strong>Conducting:</strong> {meeting.conducting}</p>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-green-900">
              Announcements
            </h3>
            <ul className="list-disc pl-6">
              {meeting.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          </section>
        )}

        <p>
          <strong>Opening Hymn:</strong>{" "}
          #{meeting.openingHymn.number} — {meeting.openingHymn.title}
        </p>

        <p>
          <strong>Opening Prayer:</strong> {meeting.openingPrayer}
        </p>

        {meeting.wardBusiness.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-green-900">
              Ward Business
            </h3>
            <ul className="list-disc pl-6">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          </section>
        )}

        <p>
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "None"}
        </p>

        <p>
          <strong>Sacrament Hymn:</strong>{" "}
          #{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
        </p>

        <section>
          <h3 className="text-xl font-bold text-green-900">
            Speakers and Musical Numbers
          </h3>
          <ul className="mt-2 space-y-2">
            {meeting.speakers.map((speaker, index) => (
              <li key={index}>
                <strong>
                  {speaker.type === "musical-number"
                    ? "Musical Number"
                    : "Speaker"}
                  :
                </strong>{" "}
                {speaker.name} — {speaker.topic}
              </li>
            ))}
          </ul>
        </section>

        <p>
          <strong>Closing Hymn:</strong>{" "}
          #{meeting.closingHymn.number} — {meeting.closingHymn.title}
        </p>

        <p>
          <strong>Closing Prayer:</strong> {meeting.closingPrayer}
        </p>
      </div>
    </article>
  );
}
