import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Protocol } from 'src/input/domain/enums/protocol.enum';
import { Transfer } from './transfer.dto';

export class ActionInput {
  @IsEnum(Protocol)
  protocol: Protocol;

  @IsDefined()
  @IsString()
  host: string;

  @IsDefined()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  port: number = 21;

  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  private_key: string;

  @IsDefined()
  @IsString()
  local_root: string;

  @IsDefined()
  @IsString()
  remote_root: string;

  @IsDefined()
  @IsArray()
  @Type(() => Transfer)
  @ValidateNested({ each: true })
  transfers: Array<Transfer>;

  @IsOptional()
  @IsBoolean()
  passive = true;
}
