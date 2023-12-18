use anyhow::Result;
use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    Web {
        #[arg(long)]
        package: String,
        #[arg(long, default_value = "page/src/generated", name = "out-dir")]
        out_dir: String,
    },
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    let current_dir = String::from(env!("CARGO_MANIFEST_DIR"));
    let current_dir = std::path::Path::new(&current_dir);
    let workspace_root = current_dir
        .parent()
        .ok_or(anyhow::anyhow!("Could not get workspace root"))?;

    match cli.command {
        Some(Commands::Web { package, out_dir }) => {
            let package_dir = workspace_root.join(&package);
            let shell = xshell::Shell::new()?;

            shell.change_dir(&package_dir);
            xshell::cmd!(shell, "cargo build --target=wasm32-unknown-unknown").run()?;

            shell.change_dir(&workspace_root);
            xshell::cmd!(
                shell,
                "wasm-bindgen --out-dir {package}/{out_dir} --web target/wasm32-unknown-unknown/debug/{package}.wasm"
            ).run()?;
        }
        None => println!("No command specified"),
    }

    Ok(())
}
