import { Request, Response, NextFunction } from 'express';
import { findById } from '../repositories/employeeRepository.js';

export async function checkEmployeeIsRegistered(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const employeeId: number = req.body.employeeId;
    const { company } = res.locals;

    const employee = await findById(employeeId);

    if (!employee) {
        throw {
            status: 404,
            message: `Employee id not registered`,
        };
    }

    if (employee.companyId != company.id) {
        throw {
            status: 401,
            message: `Employee registered in another company`,
        };
    }

    res.locals.employee = employee;

    next();
}
