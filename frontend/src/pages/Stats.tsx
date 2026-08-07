import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts'

import Card from '../components/Card'
import { mockStatsOverTime } from '../mock'

export default function Stats() {
  return (
    <div className="container-max-w mb-4 lg:mb-8">
      <p className="text-sm font-medium text-secondary mb-2">Stats dashboard</p>
      <div className="columns-1 sm:columns-4 mb-4">
        <Card>
          <p className="text-xs text-tertiary mb-1">Applied</p>
          <h1 className="text-2xl font-bold">3</h1>
        </Card>
        <Card>
          <p className="text-xs text-tertiary mb-1">Interview</p>
          <h1 className="text-2xl font-bold">2</h1>
        </Card>
        <Card>
          <p className="text-xs text-tertiary mb-1">Offer</p>
          <h1 className="text-2xl font-bold">1</h1>
        </Card>
        <Card>
          <p className="text-xs text-tertiary mb-1">Rejected</p>
          <h1 className="text-2xl font-bold">1</h1>
        </Card>
      </div>
      <div className="mb-4">
        <Card>
          <p className="text-sm text-secondary mb-4">Applications over time</p>
          <LineChart
            style={{ width: '99%', maxHeight: '20vh', aspectRatio: 1.5 }}
            margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
            responsive
            data={mockStatsOverTime}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--color-secondary)"
              strokeDasharray="5 5"
              strokeOpacity={0.6}
            />
            <XAxis
              dataKey="period"
              padding={{ left: 0, right: 0 }}
              tick={{ fontSize: 12, fill: 'var(--color-primary)' }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              dataKey="count"
              width={50}
              tickFormatter={(value) =>
                value === 0 || value === '0' ? '' : value
              }
              tick={{ fontSize: 12, fill: 'var(--color-primary)' }}
              axisLine={false}
              tickLine={false}
              dx={-5}
            />
            <Tooltip
              cursor={{
                color: 'var(--color-primary)',
                stroke: 'var(--color-border)',
              }}
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                borderColor: 'var(--color-border)',
                fontSize: 12,
                borderRadius: 12,
              }}
            />
            <Line
              dataKey="count"
              name="Applications"
              stroke="var(--color-tertiary)"
              strokeWidth={3}
            />
          </LineChart>
        </Card>
      </div>
      <div className="mb-4">
        <Card>
          <p className="text-sm text-secondary mb-4">Conversion by stage</p>
          <div className="flex items-center mb-2">
            <p className="text-xs text-tertiary mr-8">Applied</p>
            <div className="w-full bg-(--color-border) h-2 rounded-full">
              <div className="bg-(--color-tertiary) h-2 rounded-full w-[10%] transition-all duration-300"></div>
            </div>
            <p className='text-xs ml-2'>10%</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-xs text-tertiary mr-5.5">Interview</p>
            <div className="w-full bg-(--color-border) h-2 rounded-full">
              <div className="bg-(--color-tertiary) h-2 rounded-full w-[67%] transition-all duration-300"></div>
            </div>
            <p className='text-xs ml-2'>67%</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-xs text-tertiary mr-11.5">Offer</p>
            <div className="w-full bg-(--color-border) h-2 rounded-full">
              <div className="bg-(--color-tertiary) h-2 rounded-full w-[23%] transition-all duration-300"></div>
            </div>
            <p className='text-xs ml-2'>23%</p>
          </div>
          <div className="flex items-center">
            <p className="text-xs text-tertiary mr-6.5">Rejected</p>
            <div className="w-full bg-(--color-border) h-2 rounded-full">
              <div className="bg-(--color-tertiary) h-2 rounded-full w-[97%] transition-all duration-300"></div>
            </div>
            <p className='text-xs ml-2'>97%</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
