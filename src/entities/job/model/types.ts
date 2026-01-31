import { ExperienceLevel } from '../../../shared/enums/ExperienceLevel';
import {EmploymentType, WorkMode} from '../../../shared/enums/JobType';
import { SkillTag } from '../../../shared/enums/SkillTag';

export interface Job {
    id: string;
    title: string;
    company_name: string;
    salary_from: number;
    salary_to: number;
    address: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    conditions: string[];
    skills: SkillTag[];
    experience: ExperienceLevel;
    employment: EmploymentType;
    work_mode: WorkMode;
    created_at: string;
}
