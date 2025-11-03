import { IconButton, PrimaryButton, Stack, TextField } from '@fluentui/react'
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
	const [editingIndex, setEditingIndex] = React.useState<number | null>(null)
	const [editQuestion, setEditQuestion] = React.useState('')
	const [editAnswer, setEditAnswer] = React.useState('')

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
		if (editingIndex === index) {
			cancelEdit()
		}
	}

	const toggleAccordion = (index: number) => {
		setExpandedIndex((prev) => (prev === index ? null : index))
	}

	const startEdit = (index: number) => {
		setEditingIndex(index)
		setEditQuestion(data[index].question)
		setEditAnswer(data[index].answer)
		setExpandedIndex(index)
	}

	const saveEdit = () => {
		if (editingIndex === null || !editQuestion.trim() || !editAnswer.trim())
			return

		const updated = data.map((item, index) =>
			index === editingIndex
				? { question: editQuestion.trim(), answer: editAnswer.trim() }
				: item
		)

		setData(updated)
		saveData(updated)
		cancelEdit()
	}

	const cancelEdit = () => {
		setEditingIndex(null)
		setEditQuestion('')
		setEditAnswer('')
	}

	const handleFilePickerSave = (filePickerResult: IFilePickerResult[]) => {
		if (filePickerResult.length > 0) {
			const imageUrl =
				filePickerResult[0].fileAbsoluteUrl ||
				filePickerResult[0].previewDataUrl

			const imageHtml = `<div class="${styles.answerContent}">
				<img src="${imageUrl}" alt="Uploaded image" style="width: 100%; height: auto; display: block;" />
			</div>`

			if (editingIndex !== null) {
				setEditAnswer((prev) => prev + imageHtml)
			} else {
				setNewAnswer((prev) => prev + imageHtml)
			}
		}
	}

	const handleFilePickerCancel = () => {}

	return (
		<div className={styles.accordionContainer}>
			{data.map((item, idx) => {
				const isOpen = expandedIndex === idx
				const isEditing = editingIndex === idx

				return (
					<div
						key={idx}
						className={`${styles.accordionItem} ${isOpen ? styles.open : ''} ${
							isEditing ? styles.editing : ''
						}`}
					>
						{isEditing ? (
							<div className={styles.editMode}>
								<Stack tokens={{ childrenGap: 16 }}>
									<TextField
										label='Question'
										value={editQuestion}
										onChange={(_, v) => setEditQuestion(v || '')}
										styles={{
											fieldGroup: {
												borderRadius: '4px',
											},
										}}
									/>

									<div>
										<div className={styles.answerHeader}>
											<label className={styles.answerLabel}>Answer</label>
											<FilePicker
												context={spContext}
												buttonLabel='Add image'
												onSave={handleFilePickerSave}
												onCancel={handleFilePickerCancel}
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

										<div className={styles.richTextContainer}>
											<RichText
												value={editAnswer}
												onChange={(text) => {
													setEditAnswer(text)
													return text
												}}
												isEditMode={true}
												className={styles.richTextEditor}
											/>
										</div>
									</div>

									<div className={styles.editActions}>
										<PrimaryButton
											text='Save'
											onClick={saveEdit}
											disabled={!editQuestion.trim() || !editAnswer.trim()}
											styles={{
												root: {
													backgroundColor: '#107c10',
													borderRadius: '4px',
												},
											}}
										/>
										<PrimaryButton
											text='Cancel'
											onClick={cancelEdit}
											styles={{
												root: {
													backgroundColor: '#605e5c',
													borderRadius: '4px',
													marginLeft: '8px',
												},
											}}
										/>
									</div>
								</Stack>
							</div>
						) : (
							// preview mode
							<>
								<div
									className={styles.accordionHeader}
									onClick={() => toggleAccordion(idx)}
								>
									<span className={styles.questionText}>{item.question}</span>
									<div className={styles.headerActions}>
										{isEditMode && (
											<>
												<IconButton
													iconProps={{ iconName: 'Edit' }}
													title='Edit question'
													onClick={(e) => {
														e.stopPropagation()
														startEdit(idx)
													}}
													styles={{
														root: {
															color: '#0078d4',
														},
														rootHovered: {
															backgroundColor: '#f4f4f4',
														},
													}}
												/>
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
											</>
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
							</>
						)}
					</div>
				)
			})}

			{isEditMode && (
				<div className={styles.editSection}>
					<Stack tokens={{ childrenGap: 16 }}>
						<TextField
							label='New Accordion Item'
							value={newQuestion}
							onChange={(_, v) => setNewQuestion(v || '')}
							placeholder='Enter your text here...'
							styles={{
								fieldGroup: {
									borderRadius: '4px',
								},
							}}
						/>

						<div>
							<div className={styles.answerHeader}>
								<label className={styles.answerLabel}>
									New Second Accordion Item
								</label>
								<FilePicker
									context={spContext}
									buttonLabel='Add image'
									onSave={handleFilePickerSave}
									onCancel={handleFilePickerCancel}
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
							text='Save Accordion'
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
		</div>
	)
}

export default IntraneXtAccordion
