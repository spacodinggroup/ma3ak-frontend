import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, Plus, Sparkles, X } from 'lucide-react';

interface Task {
  id: number;
  task: string;
  priority: 'High' | 'Medium' | 'Low';
  due: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: 1, task: 'Review Q4 marketing budget', priority: 'High', due: 'Today', completed: false },
  { id: 2, task: 'Approve social media calendar', priority: 'Medium', due: 'Tomorrow', completed: false },
  { id: 3, task: 'Analyze competitor pricing', priority: 'Low', due: 'This week', completed: false },
  { id: 4, task: 'Prepare investor presentation', priority: 'High', due: 'Dec 15', completed: false },
];

const aiSuggestions = [
  'Follow up with leads from last campaign',
  'Review and optimize landing page CTAs',
  'Schedule monthly team performance review',
  'Update product pricing page',
];

export function TasksAndGoals() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { 
          id: Date.now(), 
          task: newTask, 
          priority: 'Medium', 
          due: 'This week', 
          completed: false 
        }
      ]);
      setNewTask('');
      setShowInput(false);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addSuggestedTask = (suggestion: string) => {
    setTasks([
      ...tasks,
      { 
        id: Date.now(), 
        task: suggestion, 
        priority: 'Medium', 
        due: 'This week', 
        completed: false 
      }
    ]);
    setShowSuggestions(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-400';
      case 'Medium': return 'bg-amber-400';
      default: return 'bg-emerald-400';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-role-business" />
            Tasks & Goals
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="text-role-business"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              AI Suggest
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowInput(!showInput)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Task Input */}
        {showInput && (
          <div className="flex gap-2">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task..."
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <Button onClick={addTask} size="sm">Add</Button>
            <Button onClick={() => setShowInput(false)} size="sm" variant="ghost">
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* AI Suggestions */}
        {showSuggestions && (
          <div className="p-3 rounded-lg bg-role-business/10 border border-role-business/20 space-y-2">
            <p className="text-xs font-medium text-role-business flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI Suggestions
            </p>
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => addSuggestedTask(suggestion)}
                className="w-full text-left text-sm p-2 rounded hover:bg-role-business/10 transition-colors flex items-center gap-2"
              >
                <Plus className="w-3 h-3 text-role-business" />
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Task List */}
        <div className="space-y-2">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`flex items-center gap-3 p-3 rounded-lg bg-muted/30 ${task.completed ? 'opacity-50' : ''}`}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="data-[state=checked]:bg-role-business data-[state=checked]:border-role-business"
              />
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${task.completed ? 'line-through' : ''}`}>
                  {task.task}
                </p>
                <p className="text-xs text-muted-foreground">{task.due}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
