export class StudentDto {
  id: number;
  name: string;
  address: string;
}

export class CreateStudentDto {
  name: string;
  address: string;
}

export class UpdateStudentDto {
  name?: string;
  address?: string;
}
