export class ClassDto {
  id: number;
  subject: string;
}

export class CreateClassDto {
  subject: string;
}

export class UpdateClassDto {
  subject?: string;
}
