import { addTask, deleteTask } from "../src/utils/state-functions";

describe('Tasks functions', () => {
    test('deleteTasks deletes the task it is given', () => {
        const startState = [{id: "1", name: 'task1', description: 'doing exercise for ramsoft', deadline: '', image: ''}];
        const finState = deleteTask(startState, "1");

        expect(finState).toEqual([]);
    });
    test('addTasks adds the task it is given', () => {
        const startState = [{id: "1", name: 'task1', description: 'doing exercise for ramsoft', deadline: '', image: ''}];
        const finState = addTask(startState, {id: "2", name: 'task2', description: 'doing exercise for nima', deadline: '', image: ''});

        expect(finState).toEqual(
            expect.arrayContaining([
                expect.objectContaining({name: 'task2'})
            ])
        )

        expect(finState[1]).toMatchObject({name: 'task2', description: 'doing exercise for nima', deadline: '', image: ''});

    });
});
