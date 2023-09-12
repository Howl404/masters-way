import {ref, get} from "firebase/database";
import {DayReportDTOToDayReportConverter} from "src/converter/DayReportConverter";
import {db} from "src/firebase";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";

// export class DayReportService {

//   public static onValueFromRealTimeDb(callBack: (data: DayReport[]) => void) {
//     onValue(ref(db, "/dayReports"), async (snapshot) => {
//       const dayReportsDTO: DayReportDTO[] = snapshot.val();
//       if (dayReportsDTO !== null) {
//         const dayReports = dayReportsDTO?.map((elem) => DayReportDTOToDayReportConverter(elem));
//         callBack(dayReports);
//       }
//     });
//   }

// }

export class DayReportService {

  public static async onValueFromRealTimeDb(): Promise<DayReport[]> {
    const snapshot = await get(ref(db, "/jobsDone"));
    const dayReportsRaw: DayReportDTO[] = await snapshot.val();
    const dayReports: DayReport[] = dayReportsRaw.map((item) => DayReportDTOToDayReportConverter(item));
    return dayReports;
  }

}