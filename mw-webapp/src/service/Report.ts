import {Report} from "src/model/report/Report";
import {ReportDTO} from "src/model/report/ReportDTO";
import {WorkDone} from "src/model/report/workDone/WorkDone";
import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
import {Time} from "src/model/report/time/Time";
import {Unit} from "src/model/report/time/unit/Unit";


const reportDTOToBusinessConverter = (reportRaw: ReportDTO) => new Report({
  ...reportRaw,
  date: new Date(reportRaw.date),
  // TODO KAte move to converter
  workDone: reportRaw.workDone?.map((workItem) => {
    const time = new Time(
      Unit[workItem.time.unit],
      workItem.time.amount,
    );

    const workDone = new WorkDone({
      id: workItem.id,
      todoItem: workItem.todoItem,
      time,
    });

    return workDone;

  },
  ),
  planForTomorrow: reportRaw.planForTomorrow?.map((planItem) =>
    new PlanForTomorrow(planItem.id, planItem.todoItem, new Time(Unit[planItem.time.unit], planItem.time.amount))),
});

export class ReportService {

  public static async getAllReports(elem: ReportDTO[]) {
    const reportsDTO: ReportDTO[] = Object.values(elem);
    const reports = reportsDTO.map(reportDTOToBusinessConverter);
    return reports;
  }

}
