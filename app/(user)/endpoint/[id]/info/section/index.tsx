'use client'
import { Endpoint } from '@/app/lib/emnify'
import { ViewLabelValue, ViewSectionContent } from '@bwsoft/view-modal'

interface ViewSectionContent {
    endpoint: Endpoint
    isUserAdm: boolean
}

export function ViewSectionContentSection({isUserAdm, endpoint}:ViewSectionContent) {
    return (
        <ViewSectionContent>
        <ViewLabelValue label="Nome" value={endpoint.name} />
        {isUserAdm  && (
            <ViewLabelValue
                label="Perfil de tarifa"
                value={endpoint.tariff_profile.name}
            />
        )}
        <ViewLabelValue
            label="Perfil do serviço"
            value={endpoint.service_profile.name}
        />
        <ViewLabelValue
            label="Status"
            value={endpoint.status.description}
        />
    </ViewSectionContent>
    )
}