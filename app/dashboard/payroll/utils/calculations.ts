interface SalaryComponents {
  baseSalary: number
  hoursWorked: number
  hourlyRate: number
  overtimeHours: number
  overtimeRate: number
  performanceBonus?: number
  holidayBonus?: number
  otherBonuses?: number
  taxRate: number
  insuranceDeduction: number
  otherDeductions?: number
}

export const calculateNetSalary = ({
  baseSalary,
  hoursWorked,
  hourlyRate,
  overtimeHours,
  overtimeRate,
  performanceBonus = 0,
  holidayBonus = 0,
  otherBonuses = 0,
  taxRate,
  insuranceDeduction,
  otherDeductions = 0
}: SalaryComponents) => {
  // Calculate regular salary
  const regularSalary = baseSalary + (hoursWorked * hourlyRate)

  // Calculate overtime pay
  const overtimePay = overtimeHours * (hourlyRate * overtimeRate)

  // Calculate total bonuses
  const totalBonuses = performanceBonus + holidayBonus + otherBonuses

  // Calculate gross salary
  const grossSalary = regularSalary + overtimePay + totalBonuses

  // Calculate tax amount
  const taxAmount = grossSalary * (taxRate / 100)

  // Calculate total deductions
  const totalDeductions = taxAmount + insuranceDeduction + otherDeductions

  // Calculate net salary
  const netSalary = grossSalary - totalDeductions

  return {
    regularSalary,
    overtimePay,
    totalBonuses,
    grossSalary,
    taxAmount,
    totalDeductions,
    netSalary,
    breakdown: {
      earnings: {
        base: regularSalary,
        overtime: overtimePay,
        bonuses: {
          performance: performanceBonus,
          holiday: holidayBonus,
          other: otherBonuses
        }
      },
      deductions: {
        tax: taxAmount,
        insurance: insuranceDeduction,
        other: otherDeductions
      }
    }
  }
}

export const calculateOvertimeRate = (baseRate: number, multiplier = 1.5) => {
  return baseRate * multiplier
}

export const calculateTaxBracket = (annualSalary: number) => {
  // Example tax brackets (can be adjusted based on local regulations)
  if (annualSalary <= 40000) return 15
  if (annualSalary <= 80000) return 25
  if (annualSalary <= 150000) return 30
  return 35
}

export const calculateInsuranceDeduction = (baseSalary: number, coverageType: 'individual' | 'family' = 'individual') => {
  // Example insurance calculation (can be adjusted based on policy)
  const baseRate = coverageType === 'individual' ? 0.05 : 0.08
  return baseSalary * baseRate
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

export const calculatePayPeriodDates = (date: Date = new Date()) => {
  const currentDate = new Date(date)
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  return {
    startDate: new Date(currentYear, currentMonth, 1),
    endDate: new Date(currentYear, currentMonth + 1, 0),
    paymentDate: new Date(currentYear, currentMonth + 1, 5) // Example: Payment on 5th of next month
  }
}

export const calculateYearToDateTotals = (payrollHistory: Array<{
  grossSalary: number
  netSalary: number
  deductions: {
    tax: number
    insurance: number
    other: number
  }
}>) => {
  return payrollHistory.reduce((totals, record) => ({
    grossSalary: totals.grossSalary + record.grossSalary,
    netSalary: totals.netSalary + record.netSalary,
    deductions: {
      tax: totals.deductions.tax + record.deductions.tax,
      insurance: totals.deductions.insurance + record.deductions.insurance,
      other: totals.deductions.other + record.deductions.other
    }
  }), {
    grossSalary: 0,
    netSalary: 0,
    deductions: {
      tax: 0,
      insurance: 0,
      other: 0
    }
  })
} 