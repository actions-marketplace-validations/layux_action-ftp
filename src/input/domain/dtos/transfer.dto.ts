import {
  IsDefined,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class Transfer {
  @IsDefined()
  @IsString()
  local_path: string;

  @IsOptional()
  @IsString()
  remote_path: string;

  @IsOptional()
  @IsBoolean()
  force_clean: boolean;

  @IsOptional()
  @IsString()
  permissions: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ignore: Array<string>;
}
