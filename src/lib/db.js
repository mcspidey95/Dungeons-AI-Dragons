// db.js
export function openDB(name = 'PrisonDB', storeName = 'prisoners') {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(name, 1);

		request.onerror = () => reject('Failed to open IndexedDB');
		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, { keyPath: 'id' });
			}
		};
	});
}

export function getAllPrisoners(db, storeName = 'prisoners') {
	return new Promise((resolve) => {
		const tx = db.transaction(storeName, 'readonly');
		const store = tx.objectStore(storeName);
		const request = store.getAll();
		request.onsuccess = () => resolve(request.result);
	});
}

export function savePrisoner(db, prisoner, storeName = 'prisoners') {
	return new Promise((resolve) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		store.put(prisoner);
		tx.oncomplete = () => resolve();
	});
}
