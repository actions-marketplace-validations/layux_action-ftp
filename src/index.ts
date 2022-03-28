import * as core from '@actions/core';
import 'reflect-metadata';
import { ActionInputParserService } from './input/application/action-input-parser.service';
import { ActionInputValidator } from './input/application/action-input-validator.service';
import { TransferMapperService } from './input/application/transfer-mapper.service';
import { FileUploaderFactory } from './uploader/application/file-uploader.factory';
import { UploadOrchestratorService } from './uploader/application/upload-orchestrator.service';

const run = async () => {
  try {
    // Get the action input transformed into its own class
    const inputParserService = new ActionInputParserService();
    const actionInput = inputParserService.getActionInput();

    // Validate the action input
    const inputValidatorService = new ActionInputValidator();
    await inputValidatorService.validateActionInput(actionInput);

    // Create connection that will later be used by the uploader
    const uploader = FileUploaderFactory.getFileUploader();

    await uploader.connect({
      host: actionInput.host,
      port: actionInput.port,
      username: actionInput.username,
      password: actionInput.password,
      privateKey: actionInput.private_key,
      remoteRootPath: actionInput.remote_root,
    });

    // Execute action with the input values
    const uploadOrchestratorService = new UploadOrchestratorService(uploader);
    const transferMapperService = new TransferMapperService();

    await uploadOrchestratorService.uploadFiles(
      transferMapperService.mapTransfers(actionInput.transfers)
    );
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};

run();
