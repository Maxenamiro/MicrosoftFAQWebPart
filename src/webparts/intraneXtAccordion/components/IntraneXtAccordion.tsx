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
import styles from './IntraneXtAccordion.module.scss'

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
					`<div class="${styles.answerContent}"><img src="${imageUrl}" alt="Uploaded image" style="width: 100%; height: auto; display: block;" /></div>`
			)
		}
		setShowFilePicker(false)
	}

	return (
		<div className={styles.accordionContainer}>
			{data.map((item, idx) => {
				const isOpen = expandedIndex === idx
				return (
					<div
						key={idx}
						className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}
					>
						<div
							className={styles.accordionHeader}
							onClick={() => toggleAccordion(idx)}
						>
							<span className={styles.questionText}>{item.question}</span>
							<div className={styles.headerActions}>
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
									className={`${styles.accordionIcon} ${
										isOpen ? styles.open : ''
									}`}
								>
									▶
								</span>
							</div>
						</div>

						{isOpen && (
							<div className={styles.accordionContent}>
								<div
									dangerouslySetInnerHTML={{ __html: item.answer }}
									className={styles.answerContent}
								/>
							</div>
						)}
					</div>
				)
			})}

			{isEditMode && (
				<div className={styles.editSection}>
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
							<div className={styles.answerHeader}>
								<label className={styles.answerLabel}>New Answer</label>
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

							<div className={styles.richTextContainer}>
								<RichText
									value={newAnswer}
									onChange={(text) => {
										setNewAnswer(text)
										return text
									}}
									isEditMode={true}
									className={styles.richTextEditor}
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
