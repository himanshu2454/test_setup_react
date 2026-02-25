import { useState, useMemo } from 'react'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import tasksContent from '../assets/tasks.md?raw'
import 'primereact/resources/themes/lara-light-blue/theme.css'

interface TaskDetail {
  name: string
  description: string
  subtasks: string[]
}

interface TasksModalProps {
  visible: boolean
  onHide: () => void
}

/**
 * Parsing logic moved outside component to run once on module load.
 * Fixed regex unnecessary escape character: \- -> -
 */
const parseMarkdown = (content: string): TaskDetail[] => {
  const lines = content.split('\n')
  const parsedTasks: TaskDetail[] = []
  let currentTask: TaskDetail | null = null
  let collectingDescription = false

  lines.forEach((line) => {
    const trimmedLine = line.trim()
    if (!trimmedLine) return

    if (trimmedLine.startsWith('# ')) {
      if (currentTask) parsedTasks.push(currentTask)
      currentTask = {
        name: trimmedLine.replace('# ', '').trim(),
        description: '',
        subtasks: [],
      }
      collectingDescription = true
    } else if ((trimmedLine.startsWith('+ ') || trimmedLine.startsWith('- ')) && currentTask) {
      collectingDescription = false
      // Fixed: Removed unnecessary escape from the hyphen in the character class
      const subtask = trimmedLine.replace(/^[+-]\s/, '').trim()
      if (subtask) currentTask.subtasks.push(subtask)
    } else if (collectingDescription && currentTask) {
      currentTask.description += currentTask.description ? ` ${trimmedLine}` : trimmedLine
    }
  })

  if (currentTask) parsedTasks.push(currentTask)
  return parsedTasks
}

const ALL_TASKS = parseMarkdown(tasksContent)

export default function TasksModal({ visible, onHide }: TasksModalProps) {
  // Set selected task directly during initialization
  const [selectedTask, setSelectedTask] = useState<TaskDetail | null>(ALL_TASKS[0] || null)

  const taskDropdownOptions = useMemo(() => ALL_TASKS.map((task) => ({
    label: task.name,
    value: task,
  })), [])

  // Callback to reset selection when the modal opens, avoiding useEffect
  const handleShow = () => {
    if (ALL_TASKS.length > 0) {
      setSelectedTask(ALL_TASKS[0])
    }
  }

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      onShow={handleShow}
      header="Tasks"
      modal
      style={{ width: '90vw', maxWidth: '600px' }}
      className="tasks-modal"
    >
      <div className="tasks-modal-content">
        {ALL_TASKS.length > 0 ? (
          <>
            <div className="task-dropdown-section" style={{ marginBottom: '1rem' }}>
              <label htmlFor="task-select" className="task-dropdown-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Select Task:
              </label>
              <Dropdown
                id="task-select"
                value={selectedTask}
                options={taskDropdownOptions}
                onChange={(e) => setSelectedTask(e.value)}
                optionLabel="label"
                placeholder="Select a task"
                className="task-dropdown"
                style={{ width: '100%' }}
              />
            </div>

            {selectedTask && (
              <div className="task-details">
                <h3 className="task-details-title">{selectedTask.name}</h3>
                {selectedTask.description && (
                  <p className="task-description">{selectedTask.description}</p>
                )}
                {selectedTask.subtasks.length > 0 && (
                  <>
                    <h4 className="subtasks-title">Details:</h4>
                    <ul className="">
                      {selectedTask.subtasks.map((subtask, idx) => (
                        <li key={idx} className="">
                          {subtask}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <p>No tasks found in the markdown file.</p>
        )}
      </div>
    </Dialog>
  )
}