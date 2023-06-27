import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    TextField,
    Menu,
    MenuItem,
} from '@mui/material';
import { Delete, CloudUpload, Edit, Folder } from '@mui/icons-material';
import axios from 'axios';
import path from 'path-browserify';

const FileManager = () => {
    const [files, setFiles] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const [newFileName, setNewFileName] = useState('');
    const [currentDirectory, setCurrentDirectory] = useState('/');
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuFile, setContextMenuFile] = useState('');

    

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`https://superuser.jsons.ae/api/files?directory=${encodeURIComponent(currentDirectory)}`);
            setFiles(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
            fetchFiles();
        }, [currentDirectory, fetchFiles]);
        
    const handleDelete = async (fileName) => {
        try {
            await axios.delete(`https://superuser.jsons.ae/api/files/${encodeURIComponent(currentDirectory)}/${fileName}`);
            fetchFiles();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRename = async (fileName) => {
        try {
            await axios.put(`https://superuser.jsons.ae/api/files/${encodeURIComponent(currentDirectory)}/${fileName}`, { newFileName });
            fetchFiles();
            setOpenDialog(false);
            setNewFileName('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`https://superuser.jsons.ae/api/files/${encodeURIComponent(currentDirectory)}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchFiles();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDialogOpen = (fileName) => {
        setSelectedFile(fileName);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setSelectedFile('');
        setNewFileName('');
    };

    const handleContextMenuOpen = (event, file) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
        setContextMenuOpen(true);
        setContextMenuFile(file);
    };

    const handleContextMenuClose = () => {
        setContextMenuOpen(false);
        setContextMenuFile('');
    };

    const handleCopy = (file) => {
        // Implement copy logic here
        console.log(`Copy ${file}`);
    };

    const handlePaste = (targetDirectory) => {
        // Implement paste logic here
        console.log(`Paste to ${targetDirectory}`);
    };

    const handleDirectoryClick = (directory) => {
        setCurrentDirectory((prevDirectory) => path.join(prevDirectory, directory));
    };

    return (
        <div onContextMenu={(e) => e.preventDefault()}>
            <input type="file" accept="image/*" onChange={handleUpload} />
            <List>
                <ListItem button onClick={() => handleDirectoryClick('..')}>
                    <Folder />
                    <ListItemText primary=".." />
                </ListItem>
                {files.map((file) => (
                    <ListItem key={file} button onContextMenu={(e) => handleContextMenuOpen(e, file)}>
                        <Folder />
                        <ListItemText primary={file} onClick={() => handleDirectoryClick(file)} />
                        <ListItemSecondaryAction>
                            <Button startIcon={<Edit />} onClick={() => handleDialogOpen(file)}>
                                Rename
                            </Button>
                            <Button startIcon={<Delete />} onClick={() => handleDelete(file)}>
                                Delete
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Rename File</DialogTitle>
                <DialogContent>
                    <TextField
                        label="New File Name"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={() => handleRename(selectedFile)} color="primary">
                        Rename
                    </Button>
                </DialogActions>
            </Dialog>
            <Menu
                open={contextMenuOpen}
                onClose={handleContextMenuClose}
                anchorReference="anchorPosition"
                anchorPosition={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
            >
                <MenuItem onClick={() => handleCopy(contextMenuFile)}>Copy</MenuItem>
                <MenuItem onClick={() => handlePaste(currentDirectory)}>Paste</MenuItem>
            </Menu>
        </div>
    );
};

export default FileManager;