import { DisplayMode, Version } from '@microsoft/sp-core-library'
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base'
import * as React from 'react'
import * as ReactDom from 'react-dom'
import IntraneXtAccordion from './components/IntraneXtAccordion'

export interface IIntraneXtAccordionWebPartProps {
  questions: { question: string; answer: string }[]
}

export default class IntraneXtAccordionWebPart extends BaseClientSideWebPart<IIntraneXtAccordionWebPartProps> {
  
  public render(): void {
    const element: React.ReactElement = React.createElement(
      IntraneXtAccordion,
      {
        initialData: this.properties.questions || [],
        saveData: (data: { question: string; answer: string }[]) => {
          this.properties.questions = data
          this.render()
        },
        isEditMode: this.displayMode === DisplayMode.Edit,
        spContext: this.context, 
      }
    )

    ReactDom.render(element, this.domElement)
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement)
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0')
  }
}