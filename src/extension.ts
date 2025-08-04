import * as vscode from "vscode";
import * as path from "path";
import { dir } from "console";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "abrirTerminal.noDiretorioAtual",
    () => {
      const activeEditor = vscode.window.activeTextEditor;

      if (!activeEditor) {
        vscode.window.showErrorMessage(
          "Nenhum arquivo está sendo editado no momento"
        );
        return;
      }

      const filePath = activeEditor.document.uri.fsPath;
      const dirPath = path.dirname(filePath);

      // Criar um diretório no diretório [dirPath]
      const terminal = vscode.window.createTerminal({ cwd: dirPath });
      terminal.show();
      vscode.window.showInformationMessage(`Terminal aberto em: ${dirPath}`);
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
