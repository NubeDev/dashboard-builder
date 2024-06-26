import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { FastField, Form, Formik } from 'formik'

import { Label } from '@/shadcn/components/label'
import { Button } from '@/shadcn/components/button'
import { DragItemModel } from '@/utils/models'
import { changeComponentPropByColumnId } from '@/store/elements-layout'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/shadcn/components/sheet'

import InputFormik from '@/components/formik/InputFormik'
import TextareaFormik from '@/components/formik/TextareaFormik'

type Props = {
  isShowSheet: boolean
  currentComponent: DragItemModel | null
  onChange: () => void
}

const ComponentEditSheet = ({ isShowSheet, currentComponent, onChange }: Props) => {
  // const
  const dispatch = useDispatch()

  // state
  const [propsSetting, setPropsSetting] = useState<Record<string, unknown>>({
    title: '',
    className: '',
    paddingLeft: '',
    paddingRight: '',
    paddingTop: '',
    paddingBottom: ''
  })

  useEffect(() => {
    if (currentComponent) {
      setPropsSetting(prev => ({
        ...prev,
        ...(currentComponent?.props ? currentComponent.props : {}),
        ...(currentComponent.props?.style ? currentComponent.props.style : {})
      }))
    }
  }, [currentComponent])

  return (
    <Sheet open={isShowSheet} onOpenChange={onChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit component</SheetTitle>
          <SheetDescription>Make changes to your component here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <Formik
          initialValues={propsSetting}
          onSubmit={values => {
            const { title, className } = values
            const newComponent = {
              ...currentComponent,
              props: {
                ...currentComponent?.props,
                title,
                className,
                style: {
                  paddingLeft: values.paddingLeft,
                  paddingRight: values.paddingRight,
                  paddingTop: values.paddingTop,
                  paddingBottom: values.paddingBottom
                }
              }
            } as DragItemModel
            dispatch(changeComponentPropByColumnId(newComponent as DragItemModel))
            onChange()
          }}
          enableReinitialize
        >
          {() => {
            return (
              <Form className="w-full">
                <div className="space-y-8">
                  <div className="space-y-1">
                    <Label>Title</Label>
                    <FastField name="title" type="text" placeholder="Enter a title" component={InputFormik} />
                  </div>
                  <div className="space-y-1">
                    <Label>Class Name</Label>
                    <FastField
                      name="className"
                      placeholder="Enter tailwind css class (example: mx-2 p-4)"
                      component={TextareaFormik}
                    />
                  </div>
                  <div className="w-full grid grid-cols-2 gap-x-4 gap-y-6">
                    <div className="space-y-1">
                      <Label>Padding Left</Label>
                      <FastField
                        name="paddingLeft"
                        type="text"
                        placeholder="Padding left value (px)"
                        component={InputFormik}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Padding Right</Label>
                      <FastField
                        name="paddingRight"
                        type="text"
                        placeholder="Padding right value (px)"
                        component={InputFormik}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Padding Top</Label>
                      <FastField
                        name="paddingTop"
                        type="text"
                        placeholder="Padding top value (px)"
                        component={InputFormik}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Padding Bottom</Label>
                      <FastField
                        name="paddingBottom"
                        type="text"
                        placeholder="Padding bottom value (px)"
                        component={InputFormik}
                      />
                    </div>
                  </div>
                  <div>
                    <Button type="submit">Save changes</Button>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </SheetContent>
    </Sheet>
  )
}

export default ComponentEditSheet
