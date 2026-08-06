import Card from "../components/Card";

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
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
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
