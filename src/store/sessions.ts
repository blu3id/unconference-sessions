import type { Writable, Readable } from 'svelte/store';
import { derived, writable } from 'svelte/store';
import { parse } from '@vanillaes/csv';

type SessionData = {
  year: number;
  time: string;
  session: number;
  room: string;
  capacity: number;
  title: string;
  leader1: string;
  leader2: string;
  leader3: string;
  leader4: string;
  notesUrl: string;
  hashtag: string;
};

type SessionDataArray = [
  number,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

type UnconferenceTimeslots = Record<number, Array<SessionData>>;
type UnconferenceYears = Record<number, UnconferenceTimeslots>;

export type { SessionData, UnconferenceTimeslots, UnconferenceYears };

class SessionsStore {
  constructor(
    public allSessions: Writable<Array<SessionData>> = writable(),
    public sessionsDataURL: Writable<string> = writable(),
    public loading: Writable<boolean> = writable(false),
    public error: Writable<boolean> = writable(false),
  ) {}

  get sessions(): Readable<UnconferenceYears> {
    return derived(this.allSessions, ($allSessions) => {
      if ($allSessions === undefined) return undefined;
      return $allSessions.reduce((years: UnconferenceYears, session) => {
        const yearsOutput = years;
        const year = $allSessions.filter((f) => f.year === session.year);
        yearsOutput[session.year] = year.reduce(
          (timeslots: UnconferenceTimeslots, yearsSession) => {
            const timeslotsOutput = timeslots;
            timeslotsOutput[yearsSession.session] = year.filter(
              (f) => f.session === yearsSession.session,
            );
            return timeslotsOutput;
          },
          {},
        );
        return yearsOutput;
      }, {});
    });
  }

  fetch(sessionsURL: string) {
    if (sessionsURL && sessionsURL !== '') {
      this.sessionsDataURL.set(sessionsURL);
    }

    this.loading.set(true);
    fetch(sessionsURL)
      .then((response) => {
        if (!response.ok) {
          this.error.set(true);
          throw new Error('Error fetching unconference sessions');
        }
        return response.text();
      })
      .then((responseText) => {
        const parsed = <Array<SessionDataArray>>(
          parse(
            responseText,
            {},
            (value: string, row: number, col: number): string | number => {
              if (row === 1) return undefined;
              if (value === '') return undefined;
              if (col === 1) return Number(value);
              // if (col == 2) return new Date('1970-01-01T' + value + ':00Z');
              if (col === 3) return Number(value);
              if (col === 5) return Number(value);
              if (col > 12) return undefined;
              return String(value);
            },
          )
        );

        const records: Array<SessionData> = [];
        parsed.shift();
        parsed.forEach((row: SessionDataArray) => {
          records.push({
            year: row[0],
            time: row[1],
            session: row[2],
            room: row[3],
            capacity: row[4],
            title: row[5],
            leader1: row[6],
            leader2: row[7],
            leader3: row[8],
            leader4: row[9],
            notesUrl: row[10],
            hashtag: row[11],
          });
        });

        this.allSessions.set(records);
        this.loading.set(false);
        // console.log(records)
      })
      .catch((error) => {
        this.error.set(true);
        console.error(
          'There has been a problem with your fetch operation:',
          error,
        );
      });
  }
}

export const sessionsStore = new SessionsStore();
