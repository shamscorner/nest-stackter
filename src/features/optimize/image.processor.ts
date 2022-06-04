import { DoneCallback, Job } from 'bull';
import { Logger } from '@nestjs/common';

async function imageProcessor(job: Job, doneCallback: DoneCallback) {
  const logger = new Logger(job.name);

  logger.debug('Start processing...');
  logger.debug(job.data.files);
  logger.debug('Processing completed');

  doneCallback(null, job.data.files);
}

export default imageProcessor;
