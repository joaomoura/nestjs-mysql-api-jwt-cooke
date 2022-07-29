import { PartialType } from '@nestjs/swagger';
import { CreateAutomobileDto } from './create-automobile.dto';

export class UpdateAutomobileDto extends PartialType(CreateAutomobileDto) {}