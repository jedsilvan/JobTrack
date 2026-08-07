import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts'

import Card from '../components/Card'
import { mockStatsOverTimeMonthly } from '../mock'

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
          <p className="text-sm text-secondary mb-1">Applications over time</p>
          <LineChart
            style={{ width: '99%', maxHeight: '20vh', aspectRatio: 1.5 }}
            margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
            responsive
            data={mockStatsOverTimeMonthly}
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
            />
            <YAxis
              dataKey="count"
              width={50}
              tickFormatter={(value) =>
                value === 0 || value === '0' ? '' : value
              }
              tick={{ fontSize: 12, fill: 'var(--color-primary)' }}
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
          <p className="text-sm text-secondary mb-2">Conversion by stage</p>
          <div className="flex items-center gap-8 mb-1">
            <p className="text-xs text-tertiary">Applied</p>
            <div className="w-full bg-(--color-border) h-2 rounded-full"></div>
          </div>
          <div className="flex items-center gap-5.5 mb-1">
            <p className="text-xs text-tertiary">Interview</p>
            <div className="w-full bg-(--color-border) h-2 rounded-full"></div>
          </div>
          <div className="flex items-center gap-11.5 mb-1">
            <p className="text-xs text-tertiary">Offer</p>
            <div className="w-full bg-(--color-border) h-2 rounded-full"></div>
          </div>
        </Card>
      </div>
    </div>
  )
}

