'use client'

import { useState } from 'react'
import {
  Card,
  Title,
  Text,
  TabGroup,
  TabList,
  Tab,
  AreaChart,
  BarChart,
  DonutChart,
  Badge,
  Button,
  TextInput,
  Select,
  SelectItem,
  Grid,
  Metric,
  Color,
} from '@tremor/react'
import {
  BanknotesIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentTextIcon,
  CalendarIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ReceiptRefundIcon,
} from '@heroicons/react/24/outline'
import { RecordExpenseModal } from './record-expense-modal'
import { DateRangeModal } from './date-range-modal'

// Helper function for consistent date formatting
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

// Revenue data for charts
const revenueData = [
  {
    date: '2024-01',
    'Room Revenue': 45000,
    'F&B Revenue': 15000,
    'Other Revenue': 5000,
  },
  {
    date: '2024-02',
    'Room Revenue': 48000,
    'F&B Revenue': 17000,
    'Other Revenue': 5500,
  },
  {
    date: '2024-03',
    'Room Revenue': 52000,
    'F&B Revenue': 19000,
    'Other Revenue': 6000,
  },
]

// Expense categories data
const expenseData = [
  {
    name: 'Staff Salaries',
    amount: 25000,
  },
  {
    name: 'Utilities',
    amount: 8000,
  },
  {
    name: 'Maintenance',
    amount: 5000,
  },
  {
    name: 'Supplies',
    amount: 7000,
  },
  {
    name: 'Marketing',
    amount: 4000,
  },
]

// Recent transactions
const transactions = [
  {
    id: 1,
    date: '2024-03-15',
    description: 'Room 301 - 3 nights',
    type: 'income',
    amount: 450,
    status: 'completed',
    paymentMethod: 'Credit Card',
  },
  {
    id: 2,
    date: '2024-03-15',
    description: 'Restaurant Bill - Table 7',
    type: 'income',
    amount: 125,
    status: 'completed',
    paymentMethod: 'Cash',
  },
  {
    id: 3,
    date: '2024-03-14',
    description: 'Utility Bill Payment',
    type: 'expense',
    amount: 2500,
    status: 'completed',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 4,
    date: '2024-03-14',
    description: 'Staff Salary',
    type: 'expense',
    amount: 1800,
    status: 'pending',
    paymentMethod: 'Bank Transfer',
  },
]

// Financial metrics
const metrics = [
  {
    title: 'Total Revenue',
    value: '$70,500',
    change: '+12.3%',
    changeType: 'positive',
    icon: BanknotesIcon,
    color: 'emerald' as Color,
  },
  {
    title: 'Total Expenses',
    value: '$49,000',
    change: '+5.2%',
    changeType: 'negative',
    icon: ArrowTrendingDownIcon,
    color: 'red' as Color,
  },
  {
    title: 'Net Profit',
    value: '$21,500',
    change: '+8.1%',
    changeType: 'positive',
    icon: ArrowTrendingUpIcon,
    color: 'emerald' as Color,
  },
  {
    title: 'Outstanding Payments',
    value: '$3,200',
    change: '-15.4%',
    changeType: 'positive',
    icon: CreditCardIcon,
    color: 'blue' as Color,
  },
]

function FinancePage() {
  const [selectedView, setSelectedView] = useState('overview')
  const [isRecordExpenseModalOpen, setIsRecordExpenseModalOpen] = useState(false)
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false)
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  })

  const handleRecordExpense = (expenseData: any) => {
    // In a real app, this would send the data to your backend
    console.log('New expense recorded:', expenseData)
    
    // Add the expense to transactions
    const newTransaction = {
      id: transactions.length + 1,
      date: expenseData.date,
      description: expenseData.description,
      type: 'expense',
      amount: expenseData.amount,
      status: 'completed',
      paymentMethod: expenseData.paymentMethod,
    }
    
    // Update transactions list (in a real app, this would be handled by a proper state management solution)
    transactions.unshift(newTransaction)
  }

  const handleExportData = () => {
    // Create CSV content
    const csvContent = [
      ['Date', 'Description', 'Type', 'Amount', 'Status', 'Payment Method'],
      ...transactions.map(t => [
        formatDate(t.date),
        t.description,
        t.type,
        t.amount,
        t.status,
        t.paymentMethod
      ])
    ].map(row => row.join(',')).join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `finance_export_${formatDate(new Date().toISOString())}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleGenerateReport = () => {
    // In a real app, this would generate a detailed financial report
    console.log('Generating report for date range:', dateRange)
    // You could open a new tab with a formatted report
    alert('Report generation started. The report will be downloaded when ready.')
  }

  const handleDateRangeChange = (newRange: { from: string; to: string }) => {
    setDateRange(newRange)
    // In a real app, this would trigger a data refresh for the selected date range
    console.log('Date range updated:', newRange)
  }

  const renderContent = () => {
    switch (selectedView) {
      case 'overview':
        return (
          <>
            {/* Metrics Overview */}
            <Grid numItemsLg={4} className="gap-6">
              {metrics.map((metric) => (
                <Card key={metric.title} decoration="top" decorationColor={metric.color}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <metric.icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <Text>{metric.title}</Text>
                        <Metric>{metric.value}</Metric>
                      </div>
                    </div>
                    <Badge 
                      color={metric.changeType === 'positive' ? 'emerald' : 'red'}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                </Card>
              ))}
            </Grid>

            {/* Revenue Chart */}
            <Card>
              <Title>Revenue Overview</Title>
              <Text>Monthly revenue breakdown by category</Text>
              <AreaChart
                className="mt-4 h-72"
                data={revenueData}
                index="date"
                categories={['Room Revenue', 'F&B Revenue', 'Other Revenue']}
                colors={['emerald', 'blue', 'amber']}
                valueFormatter={(number) => `$${number.toLocaleString()}`}
              />
            </Card>

            {/* Expense Breakdown and Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <Title>Expense Breakdown</Title>
                <Text>Distribution of expenses by category</Text>
                <DonutChart
                  className="mt-4 h-60"
                  data={expenseData}
                  category="amount"
                  index="name"
                  valueFormatter={(number) => `$${number.toLocaleString()}`}
                  colors={['slate', 'violet', 'indigo', 'rose', 'cyan']}
                />
              </Card>

              <Card>
                <Title>Recent Transactions</Title>
                <Text>Latest financial activities</Text>
                <div className="mt-4 space-y-4">
                  {transactions.slice(0, 3).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <Text className="font-medium">{transaction.description}</Text>
                        <div className="flex items-center space-x-2">
                          <Text className="text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </Text>
                          <Badge color={transaction.status === 'completed' ? 'emerald' : 'yellow'}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <Text 
                          className={
                            transaction.type === 'income' 
                              ? 'text-emerald-600 font-medium' 
                              : 'text-red-600 font-medium'
                          }
                        >
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                        </Text>
                        <Text className="text-sm text-gray-500">{transaction.paymentMethod}</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )

      case 'revenue':
        return (
          <div className="space-y-6">
            <Card>
              <Title>Revenue Details</Title>
              <Text>Comprehensive revenue analysis</Text>
              <AreaChart
                className="mt-4 h-96"
                data={revenueData}
                index="date"
                categories={['Room Revenue', 'F&B Revenue', 'Other Revenue']}
                colors={['emerald', 'blue', 'amber']}
                valueFormatter={(number) => `$${number.toLocaleString()}`}
              />
            </Card>
            <Grid numItemsLg={3} className="gap-6">
              {Object.entries(revenueData[revenueData.length - 1])
                .filter(([key]) => key !== 'date')
                .map(([key, value]) => (
                  <Card key={key}>
                    <Text>{key}</Text>
                    <Metric>${value.toLocaleString()}</Metric>
                    <Text className="text-gray-500">Latest month</Text>
                  </Card>
                ))}
            </Grid>
          </div>
        )

      case 'expenses':
        return (
          <div className="space-y-6">
            <Card>
              <Title>Expense Analysis</Title>
              <Text>Detailed breakdown of expenses</Text>
              <DonutChart
                className="mt-4 h-80"
                data={expenseData}
                category="amount"
                index="name"
                valueFormatter={(number) => `$${number.toLocaleString()}`}
                colors={['slate', 'violet', 'indigo', 'rose', 'cyan']}
              />
            </Card>
            <div className="grid grid-cols-1 gap-4">
              {expenseData.map((expense) => (
                <Card key={expense.name}>
                  <div className="flex items-center justify-between">
                    <div>
                      <Text>{expense.name}</Text>
                      <Text className="text-gray-500">Monthly expense</Text>
                    </div>
                    <Metric>${expense.amount.toLocaleString()}</Metric>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'transactions':
        return (
          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Title>All Transactions</Title>
                  <Text>Complete transaction history</Text>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="xs">Filter</Button>
                  <Button variant="secondary" size="xs">Export</Button>
                </div>
              </div>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div>
                      <Text className="font-medium">{transaction.description}</Text>
                      <div className="flex items-center space-x-2">
                        <Text className="text-sm text-gray-500">
                          {formatDate(transaction.date)}
                        </Text>
                        <Badge color={transaction.status === 'completed' ? 'emerald' : 'yellow'}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <Text 
                        className={
                          transaction.type === 'income' 
                            ? 'text-emerald-600 font-medium' 
                            : 'text-red-600 font-medium'
                        }
                      >
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                      </Text>
                      <Text className="text-sm text-gray-500">{transaction.paymentMethod}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title>Financial Management</Title>
          <Text>Monitor and manage hotel finances</Text>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            icon={DocumentTextIcon}
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>
          <Button 
            icon={CalendarIcon}
            onClick={() => setIsDateRangePickerOpen(true)}
          >
            {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
          </Button>
        </div>
      </div>

      {/* View Selector */}
      <TabGroup index={['overview', 'revenue', 'expenses', 'transactions'].indexOf(selectedView)} onIndexChange={(index) => {
        const views = ['overview', 'revenue', 'expenses', 'transactions']
        setSelectedView(views[index])
      }}>
        <TabList className="mt-8">
          <Tab icon={ChartBarIcon}>
            Overview
          </Tab>
          <Tab icon={BanknotesIcon}>
            Revenue
          </Tab>
          <Tab icon={ArrowTrendingDownIcon}>
            Expenses
          </Tab>
          <Tab icon={BuildingLibraryIcon}>
            Transactions
          </Tab>
        </TabList>
      </TabGroup>

      {/* Content */}
      {renderContent()}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button 
          icon={ReceiptRefundIcon}
          onClick={() => setIsRecordExpenseModalOpen(true)}
        >
          Record Expense
        </Button>
        <Button 
          variant="secondary" 
          icon={DocumentTextIcon}
          onClick={handleExportData}
        >
          Export Data
        </Button>
        <Button 
          variant="secondary" 
          icon={CreditCardIcon}
          onClick={() => {
            // In a real app, this would navigate to a payments management page
            alert('Payments management feature coming soon!')
          }}
        >
          Manage Payments
        </Button>
      </div>

      {/* Modals */}
      <RecordExpenseModal
        isOpen={isRecordExpenseModalOpen}
        onClose={() => setIsRecordExpenseModalOpen(false)}
        onSubmit={handleRecordExpense}
      />
      <DateRangeModal
        isOpen={isDateRangePickerOpen}
        onClose={() => setIsDateRangePickerOpen(false)}
        onSubmit={handleDateRangeChange}
        initialRange={dateRange}
      />
    </div>
  )
}

export default FinancePage 