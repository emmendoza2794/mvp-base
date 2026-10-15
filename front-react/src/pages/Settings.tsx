import { Card } from 'primereact/card'

export default function Settings() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configuraciones</h1>
        <p className="text-gray-500 text-sm mt-1">Gestiona las preferencias de tu cuenta</p>
      </div>

      <Card>
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
          <span className="icon-[ic--twotone-settings] w-16 h-16 mb-4 opacity-30" />
          <p className="text-lg font-medium">Próximamente</p>
          <p className="text-sm mt-1">Esta sección está en construcción</p>
        </div>
      </Card>
    </div>
  )
}
