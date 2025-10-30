import {
	IconButton,
	Panel,
	PanelType,
	PrimaryButton,
	Stack,
	TextField,
} from '@fluentui/react'
import {
	FilePicker,
	IFilePickerResult,
} from '@pnp/spfx-controls-react/lib/FilePicker'
import { RichText } from '@pnp/spfx-controls-react/lib/RichText'
import * as React from 'react'

export interface IQAItem {
	question: string
	answer: string
}

export interface IIntraneXtAccordionProps {
	initialData?: IQAItem[]
	saveData: (data: IQAItem[]) => void
	isEditMode: boolean
	spContext?: any
}

export const IntraneXtAccordion: React.FC<IIntraneXtAccordionProps> = ({
	initialData = [],
	saveData,
	isEditMode,
	spContext,
}) => {
	const [data, setData] = React.useState<IQAItem[]>(initialData)
	const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null)
	const [newQuestion, setNewQuestion] = React.useState('')
	const [newAnswer, setNewAnswer] = React.useState('')
	const [showFilePicker, setShowFilePicker] = React.useState(false)

	React.useEffect(() => {
		setData(initialData)
	}, [initialData])

	const addItem = () => {
		if (!newQuestion.trim() || !newAnswer.trim()) return
		const updated = [
			...data,
			{ question: newQuestion.trim(), answer: newAnswer.trim() },
		]
		setData(updated)
		saveData(updated)
		setNewQuestion('')
		setNewAnswer('')
	}

	const removeItem = (index: number) => {
		const updated = data.filter((_, i) => i !== index)
		setData(updated)
		saveData(updated)
		if (expandedIndex === index) {
			setExpandedIndex(null)
		}
	}

	const toggleAccordion = (index: number) => {
		setExpandedIndex((prev) => (prev === index ? null : index))
	}

	const handleFilePickerSave = (filePickerResult: IFilePickerResult[]) => {
		if (filePickerResult.length > 0) {
			const imageUrl =
				filePickerResult[0].fileAbsoluteUrl ||
				filePickerResult[0].previewDataUrl
			setNewAnswer(
				(prev) =>
					prev +
					`<img src="${imageUrl}" alt="Uploaded image" style="max-width: 100% !important; height: auto !important;" />`
			)
		}
		setShowFilePicker(false)
	}

	return (
		<div className='intraneXtAccordion'>
			{data.map((item, idx) => {
				const isOpen = expandedIndex === idx
				return (
					<div
						key={idx}
						style={{
							border: '1px solid #e1e1e1',
							borderRadius: '6px',
							marginBottom: '8px',
							backgroundColor: isOpen ? '#fafafa' : 'white',
							transition: 'all 0.2s ease',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '16px',
								cursor: 'pointer',
								fontWeight: 600,
								userSelect: 'none',
							}}
							onClick={() => toggleAccordion(idx)}
						>
							<span style={{ flex: 1, marginRight: '16px' }}>
								{item.question}
							</span>
							<div
								style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
							>
								{isEditMode && (
									<IconButton
										iconProps={{ iconName: 'Delete' }}
										title='Delete question'
										onClick={(e) => {
											e.stopPropagation()
											removeItem(idx)
										}}
										styles={{
											root: {
												color: '#a4262c',
											},
											rootHovered: {
												backgroundColor: '#f4f4f4',
											},
										}}
									/>
								)}
								<span
									style={{
										transition: 'transform 0.2s ease',
										transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
										fontSize: '12px',
										color: '#666',
									}}
								>
									▶
								</span>
							</div>
						</div>

						{isOpen && (
							<div
								style={{
									padding: '16px',
									borderTop: '1px solid #e1e1e1',
									backgroundColor: 'white',
								}}
							>
								<div
									dangerouslySetInnerHTML={{ __html: item.answer }}
									style={{
										lineHeight: 1.6,
										minHeight: '20px',
									}}
								/>
							</div>
						)}
					</div>
				)
			})}

			{isEditMode && (
				<div
					style={{
						marginTop: '32px',
						padding: '20px',
						border: '2px dashed #e1e1e1',
						borderRadius: '8px',
						backgroundColor: '#fafafa',
					}}
				>
					<Stack tokens={{ childrenGap: 16 }}>
						<TextField
							label='New Question'
							value={newQuestion}
							onChange={(_, v) => setNewQuestion(v || '')}
							placeholder='Enter your question here...'
							styles={{
								fieldGroup: {
									borderRadius: '4px',
								},
							}}
						/>

						<div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: '8px',
								}}
							>
								<label style={{ fontWeight: 600, display: 'block' }}>
									New Answer
								</label>
								<PrimaryButton
									text='Add Image'
									onClick={() => setShowFilePicker(true)}
									styles={{
										root: {
											backgroundColor: '#0078d4',
											borderRadius: '4px',
										},
									}}
								/>
							</div>

							<div
								style={{
									border: '1px solid #e1e1e1',
									borderRadius: '4px',
									overflow: 'hidden',
								}}
							>
								<RichText
									value={newAnswer}
									onChange={(text) => {
										setNewAnswer(text)
										return text
									}}
									isEditMode={true}
									// editorClassName='intraneXtRichTextEditor'
								/>
							</div>
						</div>

						<PrimaryButton
							text='Add FAQ Item'
							onClick={addItem}
							disabled={!newQuestion.trim() || !newAnswer.trim()}
							styles={{
								root: {
									backgroundColor: '#107c10',
									borderRadius: '4px',
									alignSelf: 'flex-start',
									padding: '0 24px',
								},
								rootDisabled: {
									backgroundColor: '#f4f4f4',
								},
							}}
						/>
					</Stack>
				</div>
			)}

			<Panel
				isOpen={showFilePicker}
				onDismiss={() => setShowFilePicker(false)}
				type={PanelType.medium}
				headerText='Select Image'
			>
				<div style={{ padding: '20px 0' }}>
					<FilePicker
						context={spContext}
						buttonLabel='Select image'
						onSave={handleFilePickerSave}
						onCancel={() => setShowFilePicker(false)}
						accepts={[
							'.gif',
							'.jpg',
							'.jpeg',
							'.bmp',
							'.dib',
							'.tif',
							'.tiff',
							'.ico',
							'.png',
							'.jxr',
							'.svg',
						]}
					/>
				</div>
			</Panel>
		</div>
	)
}

export default IntraneXtAccordion
